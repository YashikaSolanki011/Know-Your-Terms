import { Request, Response } from "express";
import admin, { db } from "../db/firebase";
import { asyncHandler } from "../utility/asyncHandler";
import { ApiError } from "../utility/ApiError";
import ApiResponse from "../utility/ApiResponse";
import { AuditLogModel } from "../models/auditLog.models";  

// Utility function to create an audit log (not an Express handler)
export async function createAuditLog({ uid, action, status, details, entityType, createdAt }: AuditLogModel) {
    if (!uid || !action || !status || !details || !entityType) {
        throw new Error('uid, action, status, details, and entityType are required');
    }
    await db.collection('auditLogs').add({
        uid,
        action,
        status,
        entityType,
        details,
        createdAt: admin.firestore.Timestamp.now()
    });
}

// get all audit logs
const getAllAuditLogs = asyncHandler(async (req: Request, res: Response) => {
    try {
        const snapshot = await db.collection('auditLogs').get();

        if (snapshot.empty) {
            return res.status(404).json(new ApiResponse(404, [], 'No audit logs found'));
        }

        const auditLogs = snapshot.docs.map(doc => doc.data() as AuditLogModel);

        return res.status(200).json(
            new ApiResponse(200, auditLogs, 'Audit logs retrieved successfully')
        );
    } catch (error: any) {
        throw new ApiError(500, error.message);
    }
})

export { getAllAuditLogs };
