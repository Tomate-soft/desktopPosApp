import { Payment } from "../../../types/payment";

export const initialState: Payment = {
  accountId: "",
  check: "",
  checkTotal: "0.00",
  noteCode: "n/a",
  tips: "0.00",
  transactions: [],
  paymentTotal: "",
  cashier: "",
  paymentDate: "",
  billing: false,
  difference: "",
};

export const initialTransaction = {
  paymentType: "cash",
  quantity: "",
};
