import { ESellTypeOrder } from "../sellTypes/types";

export enum EProductStatus {
  ENABLE = "enable",
  DISABLE = "disable",
}

type TPrice = {
  name: string;
  status: boolean;
};

export interface IPrices {
  [ESellTypeOrder.ON_SITE_ORDER]: TPrice;
  [ESellTypeOrder.TOGO_ORDER]: TPrice;
  [ESellTypeOrder.RAPPI_ORDER]: TPrice;
  [ESellTypeOrder.PHONE_ORDER]: TPrice;
}

export interface IProduct {
  _id?: string;
  code?: string;
  productName: string;
  prices: IPrices;
  status: EProductStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommandProduct extends IProduct {
  quantity: number;
  sellType: ESellTypeOrder;
  unique?: string; // Todo evaluar el echo de hacerlo requerido
  active: boolean;
}
