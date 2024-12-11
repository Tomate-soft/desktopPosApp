export enum EOperationType {
  IN = 'inflow',
  OUT = 'outflow'
}

export interface ICreatedTransaction {
  type: string
  quantity: string
  operation: EOperationType
  sessionId: string
}

export interface ITransaction extends ICreatedTransaction {
  showTransaction: () => ICreatedTransaction
}

export interface ManageTransaction {
  createTransaction: () => ITransaction
}

export enum TransactionType {
  CASH_TRANSACTION = 'cash',
  DEBIT_TRANSACTION = 'debit',
  CREDIT_TRANSACTION = 'credit',
  TRANSFER_TRANSACTION = 'transfer'
}
