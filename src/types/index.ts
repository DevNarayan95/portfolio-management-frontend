// src/types/index.ts

// Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Portfolio Types
export enum InvestmentType {
  MUTUAL_FUND = 'MUTUAL_FUND',
  STOCK = 'STOCK',
  BOND = 'BOND',
  CRYPTO = 'CRYPTO',
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  totalValue: number;
  totalInvested: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreatePortfolioPayload {
  name: string;
  description?: string;
}

// Investment Types
export interface Investment {
  id: string;
  portfolioId: string;
  type: InvestmentType;
  name: string;
  symbol: string;
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
  purchaseDate: string;
  notes?: string;
  isSIP: boolean;
  sipAmount?: number;
  sipStartDate?: string;
  sipDuration?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateInvestmentPayload {
  type: InvestmentType;
  name: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  notes?: string;
  isSIP: boolean;
  sipAmount?: number;
  sipStartDate?: string;
  sipDuration?: number;
}

export interface UpdateInvestmentPayload extends Partial<CreateInvestmentPayload> {
  currentPrice?: number;
}

// Transaction Types
export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export interface Transaction {
  id: string;
  investmentId: string;
  type: TransactionType;
  quantity: number;
  price: number;
  amount: number;
  transactionDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionPayload {
  type: TransactionType;
  quantity: number;
  price: number;
  amount: number;
  transactionDate: string;
  notes?: string;
}

export interface FilterTransactionPayload {
  type?: TransactionType;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

// Dashboard Types
export interface PortfolioPerformance {
  portfolioId: string;
  portfolioName: string;
  totalValue: number;
  totalInvested: number;
  profit: number;
  profitPercentage: number;
  investments: Investment[];
}

export interface DashboardSummary {
  totalPortfolios: number;
  totalValue: number;
  totalInvested: number;
  totalProfit: number;
  totalProfitPercentage: number;
  portfolios: PortfolioPerformance[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
  timestamp: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormError {
  [key: string]: string;
}
