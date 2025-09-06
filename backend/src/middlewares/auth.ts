import { Request, Response, NextFunction } from "express";

// Extend Express Request type to include 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

import admin from "../db/firebase";
import { asyncHandler } from "../utility/asyncHandler";
import { ApiError } from "../utility/ApiError";

export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, 'No token provided');
  }
  
  const idToken = authHeader.split(" ")[1];
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if(!decodedToken) {
      throw new ApiError(401, 'You are not authorized to access this resource');
    }
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      roles: decodedToken.roles,
      language: decodedToken.language,
    };
    next();
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired token');
  }
});