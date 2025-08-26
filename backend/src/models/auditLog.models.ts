export interface AuditLogModel {
  uid: string; // User who performed the action
  action: string;
  status: "success" | "failure";
  entityType: "User" | "Agreement" | "Case" | "VideoSession" | "Other";
  details?: string;
  createdAt?: FirebaseFirestore.Timestamp;
}