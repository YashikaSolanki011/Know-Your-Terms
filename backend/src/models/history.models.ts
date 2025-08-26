
// Model for storing AI-extracted process results in user search history
export interface ProcessHistory {
  id: string;  // (Firestore doc ID)
  uid: string; // User UID 
  processType: string; // e.g., 'rental agreement', 'loan agreement'
  processedAt: FirebaseFirestore.Timestamp;

  // AI-extracted process results
  processSteps: string; // What is the process for this task?
  requiredDocuments: string; // What documents are required?
  creationLinks: string; // Where to create documents (websites/links)
  priceInfo: string; // What are the prices of the document?
  needExpert: string; // When do you need a lawyer or CA?

  aiRawOutput?: any;
  language?: string;
}

// Model for storing AI-extracted agreement results in user search history
export interface AgreementHistory {
  id: string; // (Firestore doc ID)
  uid: string; // User UID
  targetGroup?: string; // Optional: target group (e.g., 'citizen', 'business', 'student')
  processedAt: FirebaseFirestore.Timestamp;

  // Unstructured or semi-structured summary from Gemini
  summary: string; // The AI-generated summary or explanation (unstructured text)
  aiRawOutput?: any; // The full raw output from Gemini
  language?: string;
}
