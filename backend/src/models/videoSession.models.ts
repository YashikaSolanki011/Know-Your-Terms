export interface VideoSessionModel {
  id: string;
  participants: string[]; // UIDs
  startedAt: FirebaseFirestore.Timestamp;
  endedAt?: FirebaseFirestore.Timestamp;
  meetLink?: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  createdBy: string;
  metadata?: Record<string, any>;
}