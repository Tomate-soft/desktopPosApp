import { Payment } from "./payment";
import { Product } from "./products";
import { SellType } from "./props/sellType";

export interface Printer {
  printerName: string;
  tcp: string;
}

export interface Bill {
  sellType?: "onSite" | "toGo" | "phone" | "rappi" | "n/A";
  user?: string;
  checkTotal?: string;
  products?: Product[];
  status?: "enable" | "free" | "forPayment" | "pending";
  payment?: Payment[];
  tableNum?: string;
  table?: string | undefined;
  accountId?: string;
}
