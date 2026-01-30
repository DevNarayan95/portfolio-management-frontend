/**
 * Portfolio & Investment Type Definitions
 */

export enum InvestmentType {
  STOCK = 'STOCK',
  MUTUAL_FUND = 'MUTUAL_FUND',
  BOND = 'BOND',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreatePortfolioRequest {
  name: string;
  description?: string;
}

export interface UpdatePortfolioRequest extends Partial<CreatePortfolioRequest> {}

export interface Investment {
  id: string;
  portfolioId: string;
  name: string;
  symbol: string;
  type: InvestmentType;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  notes?: string;
  isSIP: boolean;
  sipAmount?: number;
  sipStartDate?: string;
  sipDuration?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateInvestmentRequest {
  name: string;
  symbol: string;
  type: InvestmentType;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  notes?: string;
  isSIP: boolean;
  sipAmount?: number;
  sipStartDate?: string;
  sipDuration?: number;
}

export interface UpdateInvestmentRequest extends Partial<CreateInvestmentRequest> {}

export interface PortfolioStats {
  portfolioId: string;
  totalValue: number;
  totalInvested: number;
  totalGainLoss: number;
  gainLossPercentage: number;
  numberOfInvestments: number;
}

export interface DashboardSummary {
  totalPortfolios: number;
  totalInvestedAmount: number;
  totalCurrentValue: number;
  totalGainLoss: number;
  overallGainLossPercentage: number;
  portfolios: PortfolioSummary[];
}

export interface PortfolioSummary {
  portfolioId: string;
  portfolioName: string;
  totalCurrentValue: number;
  totalInvestedAmount: number;
  totalGainLoss: number;
  gainLossPercentage: string;
  numberOfInvestments: number;
  investments: Investment[];
}
