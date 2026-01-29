/**
 * Mock Data Service
 * This service provides mock data for development
 * Can be easily replaced with real API calls by modifying the API services
 */

import {
  User,
  Portfolio,
  Investment,
  Transaction,
  DashboardSummary,
  InvestmentType,
  TransactionType,
} from '@types/index';

// Mock User Data
export const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+91-9876543210',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
};

// Mock Portfolio Data
export const mockPortfolios: Portfolio[] = [
  {
    id: 'portfolio-1',
    userId: '1',
    name: 'Primary Portfolio',
    description: 'Main investment portfolio',
    totalValue: 750000,
    totalInvested: 550000,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T15:45:00Z',
  },
  {
    id: 'portfolio-2',
    userId: '1',
    name: 'Retirement Fund',
    description: 'Long-term retirement savings',
    totalValue: 450000,
    totalInvested: 400000,
    createdAt: '2024-02-01T08:15:00Z',
    updatedAt: '2024-02-10T12:00:00Z',
  },
  {
    id: 'portfolio-3',
    userId: '1',
    name: 'Trading Portfolio',
    description: 'Short-term trading portfolio',
    totalValue: 125000,
    totalInvested: 100000,
    createdAt: '2024-02-15T14:20:00Z',
    updatedAt: '2024-02-20T09:30:00Z',
  },
];

// Mock Investment Data
export const mockInvestments: Investment[] = [
  {
    id: 'inv-1',
    portfolioId: 'portfolio-1',
    type: InvestmentType.MUTUAL_FUND,
    name: 'HDFC Growth Fund',
    symbol: 'HDFCG',
    quantity: 100,
    currentPrice: 450,
    purchasePrice: 400,
    purchaseDate: '2023-12-01T00:00:00Z',
    notes: 'SIP investment for long-term growth',
    isSIP: true,
    sipAmount: 5000,
    sipStartDate: '2023-12-01T00:00:00Z',
    sipDuration: 60,
    createdAt: '2023-12-01T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'inv-2',
    portfolioId: 'portfolio-1',
    type: InvestmentType.STOCK,
    name: 'Infosys Limited',
    symbol: 'INFY',
    quantity: 50,
    currentPrice: 1550,
    purchasePrice: 1400,
    purchaseDate: '2024-01-10T00:00:00Z',
    notes: 'Tech stock investment',
    isSIP: false,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'inv-3',
    portfolioId: 'portfolio-1',
    type: InvestmentType.BOND,
    name: 'Government Bond 2030',
    symbol: 'GB2030',
    quantity: 10,
    currentPrice: 980,
    purchasePrice: 1000,
    purchaseDate: '2024-01-15T00:00:00Z',
    notes: 'Fixed income investment',
    isSIP: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'inv-4',
    portfolioId: 'portfolio-1',
    type: InvestmentType.CRYPTO,
    name: 'Bitcoin',
    symbol: 'BTC',
    quantity: 0.5,
    currentPrice: 2800000,
    purchasePrice: 2500000,
    purchaseDate: '2024-01-20T00:00:00Z',
    notes: 'Cryptocurrency investment',
    isSIP: false,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'inv-5',
    portfolioId: 'portfolio-2',
    type: InvestmentType.MUTUAL_FUND,
    name: 'ICICI Prudential Balanced Fund',
    symbol: 'ICICIBAL',
    quantity: 200,
    currentPrice: 550,
    purchasePrice: 500,
    purchaseDate: '2023-11-01T00:00:00Z',
    notes: 'Balanced fund for retirement',
    isSIP: true,
    sipAmount: 10000,
    sipStartDate: '2023-11-01T00:00:00Z',
    sipDuration: 120,
    createdAt: '2023-11-01T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'inv-6',
    portfolioId: 'portfolio-3',
    type: InvestmentType.STOCK,
    name: 'TCS Limited',
    symbol: 'TCS',
    quantity: 25,
    currentPrice: 3500,
    purchasePrice: 3200,
    purchaseDate: '2024-02-01T00:00:00Z',
    notes: 'Trading stock',
    isSIP: false,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
];

// Mock Transaction Data
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    investmentId: 'inv-1',
    type: TransactionType.BUY,
    quantity: 10,
    price: 400,
    amount: 4000,
    transactionDate: '2023-12-01T10:30:00Z',
    notes: 'Initial SIP purchase',
    createdAt: '2023-12-01T10:30:00Z',
    updatedAt: '2023-12-01T10:30:00Z',
  },
  {
    id: 'txn-2',
    investmentId: 'inv-1',
    type: TransactionType.BUY,
    quantity: 10,
    price: 410,
    amount: 4100,
    transactionDate: '2024-01-01T10:30:00Z',
    notes: 'Monthly SIP',
    createdAt: '2024-01-01T10:30:00Z',
    updatedAt: '2024-01-01T10:30:00Z',
  },
  {
    id: 'txn-3',
    investmentId: 'inv-2',
    type: TransactionType.BUY,
    quantity: 50,
    price: 1400,
    amount: 70000,
    transactionDate: '2024-01-10T09:15:00Z',
    notes: 'Stock purchase',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
  },
  {
    id: 'txn-4',
    investmentId: 'inv-3',
    type: TransactionType.BUY,
    quantity: 10,
    price: 1000,
    amount: 10000,
    transactionDate: '2024-01-15T11:00:00Z',
    notes: 'Bond purchase',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },
  {
    id: 'txn-5',
    investmentId: 'inv-4',
    type: TransactionType.BUY,
    quantity: 0.5,
    price: 2500000,
    amount: 1250000,
    transactionDate: '2024-01-20T14:45:00Z',
    notes: 'Bitcoin purchase',
    createdAt: '2024-01-20T14:45:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
];

// Calculate dashboard summary
export const calculateDashboardSummary = (): DashboardSummary => {
  const portfolios = mockPortfolios.map((portfolio) => {
    const investments = mockInvestments.filter((inv) => inv.portfolioId === portfolio.id);
    const totalValue = investments.reduce((sum, inv) => sum + inv.currentPrice * inv.quantity, 0);
    const totalInvested = investments.reduce(
      (sum, inv) => sum + inv.purchasePrice * inv.quantity,
      0
    );
    const profit = totalValue - totalInvested;
    const profitPercentage = (profit / totalInvested) * 100;

    return {
      portfolioId: portfolio.id,
      portfolioName: portfolio.name,
      totalValue,
      totalInvested,
      profit,
      profitPercentage,
      investments,
    };
  });

  const totalValue = portfolios.reduce((sum, p) => sum + p.totalValue, 0);
  const totalInvested = portfolios.reduce((sum, p) => sum + p.totalInvested, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPercentage = (totalProfit / totalInvested) * 100;

  return {
    totalPortfolios: mockPortfolios.length,
    totalValue,
    totalInvested,
    totalProfit,
    totalProfitPercentage,
    portfolios,
  };
};

/**
 * Simulate API delay
 */
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
