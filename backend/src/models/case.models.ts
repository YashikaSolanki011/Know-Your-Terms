
// Model for storing case history/metadata (for judges, search, etc.)
export interface CaseModel {
  id: string; // Firestore doc ID
  caseNumber: string;
  title: string;
  parties: string[];
  judge?: string;
  status: string;
  summary?: string;
  relatedLaws?: string[];
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  metadata?: Record<string, any>;
}