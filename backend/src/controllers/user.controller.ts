import { Request, Response } from 'express';
import admin, { db } from '../db/firebase';
import { UserModel, UserRole, UserStatus } from '../models/user.models';
import { asyncHandler } from '../utility/asyncHandler';
import { ApiError } from '../utility/ApiError';
import ApiResponse from '../utility/ApiResponse';
import { createAuditLog } from './admin.controller';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, displayName, roles, region, language } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required.');
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ApiError(400, 'Invalid email format.');
  }

  try {
    // Check if user exists in Firebase Auth
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (e) {
      await createAuditLog({
        uid: 'unknown',
        action: 'USER_REGISTERED',
        status: 'failure',
        entityType: 'User',
        details: `Attempted registration for non-existent Firebase Auth user: ${email}`
      });
      throw new ApiError(404, 'User does not exist in Firebase Auth. Please register via the app first.');
    }

    // Prepare Firestore user document
    const userDoc: UserModel = {
      uid: userRecord.uid,
      email: userRecord.email!,
      displayName: displayName || userRecord.displayName || '',
      photoURL: userRecord.photoURL || '',
      phoneNumber: userRecord.phoneNumber || '',
      roles: roles || ['USER'],
      providerId: userRecord.providerData[0]?.providerId || 'password',
      region,
      language: language || 'en',
      status: 'active',
      isBlocked: false,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    };

    await db.collection('users').doc(userRecord.uid).set(userDoc);

    await createAuditLog({
      uid: userRecord.uid,
      action: 'USER_REGISTERED',
      status: 'success',
      entityType: 'User',
      details: `User profile created/updated for email: ${userRecord.email}`
    });

    return res.status(201).json(
      new ApiResponse(201, { user: userDoc }, 'User profile created/updated successfully')
    );
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required.');
  }

  // Firebase Auth does not support password verification server-side directly
  // You should use Firebase Client SDK for login, but for backend, you can use custom token
  // Here, we just check if user exists and is not blocked
  
  try {
    let userRecord;
    
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (e) {
      await createAuditLog({
        uid: 'unknown',
        action: 'USER_LOGIN',
        status: 'failure',
        entityType: 'User',
        details: `Login attempt with invalid email: ${email}`
      });
      throw new ApiError(401, 'Invalid email or password.');
    }
    
    // Optionally, check isBlocked in Firestore
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    
    if (!userDoc.exists || userDoc.data()?.isBlocked) {
      await createAuditLog({
        uid: userRecord.uid,
        action: 'USER_LOGIN',
        status: 'failure',
        entityType: 'User',
        details: `Blocked or non-existent user attempted login with email: ${userRecord.email}`
      });
      throw new ApiError(403, 'User is blocked or does not exist.');
    }
    // For backend login, you should use Firebase Client SDK or implement custom token logic
    // Here, just return user profile for demo
    // add audit log

    await createAuditLog({
      uid: userRecord.uid,
      action: 'USER_LOGIN',
      status: 'success',
      entityType: 'User',
      details: `User logged in with email: ${userRecord.email}`
    });

    return res.status(200).json(
      new ApiResponse(200, { user: userDoc.data() }, 'Login successful (password check should be done on client)')
    );
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {

  const uid = req.user?.uid;
  if (!uid) {
    throw new ApiError(400, 'User ID is required.');
  }
  
  try {
    const userDoc = await db.collection('users').doc(String(uid)).get();
    if (!userDoc.exists) {
      throw new ApiError(404, 'User not found.');
    }
    
    return res.status(200).json(
      new ApiResponse(200, userDoc.data(), 'User profile retrieved successfully')
    );
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});

// get all users 
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  
  try {
    const snapshot = await db.collection('users').get();
    
    if (snapshot.empty) {
      throw new ApiError(404, 'No users found');
    }
    
    const users = snapshot.docs.map(doc => doc.data());
    
    return res.status(200).json(
      new ApiResponse(200, users, 'Users retrieved successfully')
    );
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  
  const { uid, displayName, phoneNumber, region, language } = req.body;
  
  if (!uid) {
    throw new ApiError(400, 'User ID is required.');
  }

  try {
    
      const updateData: any = {};
      
      if (displayName) updateData.displayName = displayName;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (region) updateData.region = region;
      if (language) updateData.language = language;
      
      updateData.updatedAt = admin.firestore.Timestamp.now();
      
      const userDoc = await db.collection('users').doc(uid).update(updateData);
      
      if (!userDoc) {
        throw new ApiError(404, 'User not found.');
      }
    
      const updatedDoc = await db.collection('users').doc(uid).get();
    
      if (!updatedDoc) {
        await createAuditLog({
          uid,
          action: 'USER_PROFILE_UPDATED',
          status: 'failure',
          entityType: 'User',
          details: `Failed to update user profile for uid: ${uid}`
        });
        throw new ApiError(500, 'Failed to update user.');
      }
    
      await createAuditLog({
        uid,
        action: 'USER_PROFILE_UPDATED',
        status: 'success',
        entityType: 'User',
        details: `User profile updated for uid: ${uid}`
      });
      return res.status(200).json(
        new ApiResponse(200, updatedDoc.data(), 'Profile updated successfully')
      );
  } catch (error: any) {
    throw new ApiError(500, error.message);
    
  }
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile
};
