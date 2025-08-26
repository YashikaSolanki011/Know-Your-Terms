import { AgreementHistory, ProcessHistory } from "./history.models";

// User roles (single and multi-role support)
export type UserRole = 'USER' | 'JUDGE' | 'ADMIN';

// User status for lifecycle management
export type UserStatus = 'active' | 'pending' | 'suspended';

export interface UserModel {
  // Core identity
  uid: string; // Firebase Auth UID
  email: string;
  emailVerified?: boolean;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;

  roles?: UserRole[]; // Multi-role support (e.g., ['USER', 'JUDGE'])
  userStatus?: UserStatus; // Account status
  
  // Auth provider
  providerId?: string; 

  // Profile & preferences
  region?: string;
  language?: string;
  profileCompleted?: boolean;

  // Status & audit
  status?: UserStatus;
  isBlocked?: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  lastLoginAt?: FirebaseFirestore.Timestamp;
  auditLogs?: string[];

  // Notification & device
  fcmToken?: string;

  // Legal expert roster
  isLawyer?: boolean;
  isCA?: boolean;
  availability?: boolean;
  isJudge?: boolean;

  // Extensibility
  metadata?: Record<string, any>; // For custom fields
}
