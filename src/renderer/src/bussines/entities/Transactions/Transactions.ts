import { EOperationType, ICreatedTransaction, ITransaction, TransactionType } from './types'

export class CashTransaction implements ITransaction {
  type: TransactionType
  quantity: string
  operation: EOperationType
  sessionId: string

  constructor(
    type: TransactionType,
    quantity: string,
    operation: EOperationType,
    sessionId: string
  ) {
    this.type = type
    this.quantity = quantity
    this.operation = operation
    this.sessionId = sessionId
  }

  showTransaction(): ICreatedTransaction {
    const transaction: ICreatedTransaction = {
      type: this.type,
      quantity: this.quantity,
      operation: this.operation,
      sessionId: this.sessionId
    }
    return transaction
  }
}

export class DebitCardTransaction extends CashTransaction {}

export class CreditCardTransaction extends CashTransaction {}

export class TransferTransaction extends CashTransaction {}
