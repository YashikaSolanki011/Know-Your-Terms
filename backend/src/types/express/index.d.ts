// Extend Express Request type to include 'files' for multer
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    files?: {
      [fieldname: string]: Express.Multer.File[];
    } | Express.Multer.File[];
  }
}
