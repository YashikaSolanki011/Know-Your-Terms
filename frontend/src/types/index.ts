// Shared types for agreement summaries
export interface BusinessClause {
  title: string;
  explanation: string;
  risk: string;
  improvement: string;
}

export interface BusinessOutput {
  about: string;
  clauses: BusinessClause[];
  financials: {
    totalFee: string;
    paymentMilestones: string[];
    lateFee: string;
  };
  keyComplianceNotes: string[];
  finalAssessment: { overallRisk: string; comment: string };
}
export interface User {
  email: string;
  emailVerified?: boolean;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  roles?: ('USER' | 'ADMIN')[];
  userStatus?: 'active' | 'pending' | 'suspended'; // Account status
  providerId?: string;
  region?: string;
  language?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface AgreementSummary {
  file: File;
  uid: string;
  targetGroup: string;
}

export interface AgreementProcess {
  uid: string;
  processType: string;
}

export interface caseSummary {
  
}