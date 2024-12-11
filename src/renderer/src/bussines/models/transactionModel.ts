import {
  CashManageTransaction,
  CreditCardManageTransaction,
  DebitCardManageTransaction,
  TransferManageTransaction
} from '../entities/Transactions/managers'
import {
  EOperationType,
  ICreatedTransaction,
  ManageTransaction,
  TransactionType
} from '../entities/Transactions/types'

function CreateTransactionManager(
  transactionType: TransactionType,
  quantity: string,
  operation: EOperationType,
  sessionId: string
): ManageTransaction {
  const transactions: {
    [key in TransactionType]: new (
      quantity: string,
      operation: EOperationType,
      sessionId: string
    ) => ManageTransaction
  } = {
    [TransactionType.CASH_TRANSACTION]: CashManageTransaction,
    [TransactionType.DEBIT_TRANSACTION]: DebitCardManageTransaction,
    [TransactionType.TRANSFER_TRANSACTION]: TransferManageTransaction,
    [TransactionType.CREDIT_TRANSACTION]: CreditCardManageTransaction
  }
  const ManagerTransaction = transactions[transactionType]
  if (!ManagerTransaction) throw new Error('Invalid transaction type')
  return new ManagerTransaction(quantity, operation, sessionId)
}

export function transactionModel(
  type: TransactionType,
  quantity: string,
  operation: EOperationType,
  sessionId: string
): ICreatedTransaction {
  const transactionManager: ManageTransaction = CreateTransactionManager(
    type,
    quantity,
    operation,
    sessionId
  )
  if (!transactionManager) throw new Error('Invalid transaction type')
  const transaction = transactionManager.createTransaction()
  return transaction.showTransaction()
}
