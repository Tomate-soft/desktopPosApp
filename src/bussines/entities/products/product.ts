import { ESellTypeOrder } from "../sellTypes/types";
import { EProductStatus, ICommandProduct, IPrices } from "./types";

export class CommandProduct implements ICommandProduct {
  productName: string;
  prices: IPrices;
  status: EProductStatus;
  quantity: number;
  sellType: ESellTypeOrder;
  active: boolean;

  constructor(commandProduct: ICommandProduct) {
    this.productName = commandProduct.productName;
    this.prices = commandProduct.prices;
    this.status = commandProduct.status;
    this.quantity = commandProduct.quantity;
    this.sellType = commandProduct.sellType;
    this.active = false;
  }

  /*
  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15); // Genera un ID aleatorio
  }

  */
}
