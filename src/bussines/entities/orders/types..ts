import { ICommandProduct } from "../products/types";
import { ESellTypeOrder } from "../sellTypes/types";

export enum EStatusOrder {
  PENDING = "pending",
  ENABLE = "enable",
  FINISHED = "finished",
  CANCELLED = "cancelled",
  FOR_PAYMENT = "forPayment",
}

export interface IOrder {
  _id?: string; // Se asigna en automatico en la creacion
  code?: string; // Se asigna en automatico en la creacion
  user: string;
  userId: string;
  checkTotal: string;
  status?: EStatusOrder; // Se asigna ENABLE por defecto
  products: ICommandProduct[];
  payment: any[];
  comments?: string;
  operatingPeriod?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateOnSiteOrder extends IOrder {
  selltype: ESellTypeOrder;
  tableNum: string;
  table: string;
  notes?: any[];
  transferHistory?: any[];
}

export interface Payment {
  _id: string;
  paymentType: string;
  quantity: string;
  payQuantity: string;
  tips: string;
}
