// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  INVESTOR = 'investor',
  BORROWER = 'borrower',
  ADMIN = 'admin'
}

// Loan types
export interface Loan {
  id: string;
  borrowerId: string;
  title: string;
  description: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  status: LoanStatus;
  riskAssessment?: RiskAssessment;
  propertyDetails: PropertyDetails;
  currentFunding: number;
  targetFunding: number;
  investors: Investment[];
  createdAt: Date;
  updatedAt: Date;
  fundedAt?: Date;
  maturityDate?: Date;
}

export enum LoanStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  FUNDING = 'funding',
  FUNDED = 'funded',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DEFAULTED = 'defaulted',
  CANCELLED = 'cancelled'
}

// Property types
export interface PropertyDetails {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: PropertyType;
  estimatedValue: number;
  purchasePrice?: number;
  squareFootage?: number;
  yearBuilt?: number;
  description: string;
  images?: string[];
}

export enum PropertyType {
  SINGLE_FAMILY = 'single_family',
  MULTI_FAMILY = 'multi_family',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  COMMERCIAL = 'commercial',
  LAND = 'land'
}

// Investment types
export interface Investment {
  id: string;
  loanId: string;
  investorId: string;
  amount: number;
  status: InvestmentStatus;
  expectedReturn: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum InvestmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Risk Assessment types
export interface RiskAssessment {
  id: string;
  loanId: string;
  riskScore: number;
  riskLevel: RiskLevel;
  factors: RiskFactor[];
  recommendation: string;
  assessedAt: Date;
  assessedBy: string; // AI service or manual
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export interface RiskFactor {
  factor: string;
  score: number;
  weight: number;
  description: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// JWT Token types
export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Request types with authentication
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// Socket.IO event types
export interface SocketEvents {
  'join-loan': (loanId: string) => void;
  'leave-loan': (loanId: string) => void;
  'subscribe-investments': () => void;
  'investment-update': (data: any) => void;
  'loan-status-update': (data: any) => void;
  'new-loan': (data: any) => void;
}

// Database query types
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface LoanFilters {
  status?: LoanStatus;
  minAmount?: number;
  maxAmount?: number;
  propertyType?: PropertyType;
  riskLevel?: RiskLevel;
  city?: string;
  state?: string;
}

export interface InvestmentFilters {
  status?: InvestmentStatus;
  investorId?: string;
  loanId?: string;
}
