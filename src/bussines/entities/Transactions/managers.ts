import {
  CashTransaction,
  CreditCardTransaction,
  DebitCardTransaction,
  TransferTransaction,
} from "./Transactions";
import {
  EOperationType,
  ITransaction,
  ManageTransaction,
  TransactionType,
} from "./types";

export class CashManageTransaction implements ManageTransaction {
  type: TransactionType;
  quantity: string;
  operation: EOperationType;
  sessionId: string;

  constructor(quantity: string, operation: EOperationType, sessionId: string) {
    this.type = TransactionType.CASH_TRANSACTION;
    this.quantity = quantity;
    this.operation = operation;
    this.sessionId = sessionId;
  }

  createTransaction(): ITransaction {
    const cashTransaction = new CashTransaction(
      this.type,
      this.quantity,
      this.operation,
      this.sessionId
    );
    return cashTransaction;
  }
}

export class DebitCardManageTransaction implements ManageTransaction {
  type: TransactionType;
  quantity: string;
  operation: EOperationType;
  sessionId: string;

  constructor(quantity: string, operation: EOperationType, sessionId: string) {
    this.type = TransactionType.DEBIT_TRANSACTION;
    this.quantity = quantity;
    this.operation = operation;
    this.sessionId = sessionId;
  }

  createTransaction(): ITransaction {
    const debitCardTransaction = new DebitCardTransaction(
      this.type,
      this.quantity,
      this.operation,
      this.sessionId
    );
    return debitCardTransaction;
  }
}

export class CreditCardManageTransaction implements ManageTransaction {
  type: TransactionType;
  quantity: string;
  operation: EOperationType;
  sessionId: string;

  constructor(quantity: string, operation: EOperationType, sessionId: string) {
    this.type = TransactionType.CREDIT_TRANSACTION;
    this.quantity = quantity;
    this.operation = operation;
    this.sessionId = sessionId;
  }
  createTransaction(): ITransaction {
    const creditCardTransaction: ITransaction = new CreditCardTransaction(
      this.type,
      this.quantity,
      this.operation,
      this.sessionId
    );
    return creditCardTransaction;
  }
}

export class TransferManageTransaction implements ManageTransaction {
  type: TransactionType;
  quantity: string;
  operation: EOperationType;
  sessionId: string;

  constructor(quantity: string, operation: EOperationType, sessionId: string) {
    this.type = TransactionType.TRANSFER_TRANSACTION;
    this.quantity = quantity;
    this.operation = operation;
    this.sessionId = sessionId;
  }
  createTransaction(): ITransaction {
    const creditCardTransaction: ITransaction = new TransferTransaction(
      this.type,
      this.quantity,
      this.operation,
      this.sessionId
    );
    return creditCardTransaction;
  }
}
