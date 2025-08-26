export interface FeedbackModel {
  id: string;
  uid: string;
  feedback: string;
  rating?: number;
  createdAt: FirebaseFirestore.Timestamp;
  relatedDocId?: string; // e.g., agreement, process, or case
  metadata?: Record<string, any>;
}
