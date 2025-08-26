import { Request, Response } from 'express';
import admin, { db } from '../db/firebase';
import { asyncHandler } from '../utility/asyncHandler';
import { ApiError } from '../utility/ApiError';
import ApiResponse from '../utility/ApiResponse';

// Get a user's process history (optionally limit)
const getProcessHistory = asyncHandler(async (req: Request, res: Response) => {
  
    const { uid, limit = 10 } = req.query;
    try {
        
        if (!uid) throw new ApiError(400, 'uid is required');
        
        const snapshot = await db.collection('processHistory')
            .where('uid', '==', uid)
            .orderBy('processedAt', 'desc')
            .limit(Number(limit)).get();
        
            const history = snapshot.docs.map(doc => doc.data());

        if (history.length === 0) {
            throw new ApiError(404, 'No process history found');
        }

        return res.status(200).json(new ApiResponse(200, history, 'Process history retrieved successfully'));
    } catch (error: any) {
        throw new ApiError(500, error.message);
    }
});

// Get a user's agreement history (optionally limit)
const getAgreementHistory = asyncHandler(async (req: Request, res: Response) => {
  
    const { uid, limit = 10 } = req.query;

    if (!uid) throw new ApiError(400, 'uid is required');

    try {
        const snapshot = await db.collection('agreementHistory')
            .where('uid', '==', uid)
            .orderBy('processedAt', 'desc')
            .limit(Number(limit)).get();

        const history = snapshot.docs.map(doc => doc.data());

        if (history.length === 0) {
            throw new ApiError(404, 'No agreement history found');
        }

        return res.status(200).json(
            new ApiResponse(200, history, 'Agreement history retrieved successfully')
        );
    } catch (error: any) {
        throw new ApiError(500, error.message);
    }
});

// Delete a process history record by id
const deleteProcessHistory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, 'id is required');
  await db.collection('processHistory').doc(id).delete();
  return res.status(200).json(new ApiResponse(200, {}, 'Process history deleted successfully'));
});

// Delete an agreement history record by id
const deleteAgreementHistory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, 'id is required');
  await db.collection('agreementHistory').doc(id).delete();
  return res.status(200).json(new ApiResponse(200, {}, 'Agreement history deleted successfully'));
});

export {
  getProcessHistory,
  getAgreementHistory,
  deleteProcessHistory,
  deleteAgreementHistory
};
