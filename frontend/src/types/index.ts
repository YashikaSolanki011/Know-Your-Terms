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