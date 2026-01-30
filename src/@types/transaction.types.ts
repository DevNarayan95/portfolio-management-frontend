/**
 * Transaction Type Definitions
 */

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export interface Transaction {
  id: string;
  investmentId: string;
  portfolioId: string;
  type: TransactionType;
  quantity: number;
  price: number;
  amount: number;
  transactionDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionRequest {
  type: TransactionType;
  quantity: number;
  price: number;
  amount: number;
  transactionDate: string;
  notes?: string;
}

export interface FilterTransactionRequest {
  type?: TransactionType;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export interface TransactionAnalytics {
  totalBuys: number;
  totalSells: number;
  totalBuyAmount: number;
  totalSellAmount: number;
  averageBuyPrice: number;
  averageSellPrice: number;
}
