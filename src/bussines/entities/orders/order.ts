import { ESellTypeOrder } from "../sellTypes/types";
import { EStatusOrder, ICreateOnSiteOrder } from "./types.";

export class OnSiteOrder implements ICreateOnSiteOrder {
  user: string;
  userId: string;
  checkTotal: string;
  status: EStatusOrder; // Se asigna ENABLE por defecto
  products: any[]; // Se inicializa vacia
  payment: any[]; // Se inicializa vacia
  selltype: ESellTypeOrder;
  tableNum: string;
  table: string;

  constructor(onsiteOrder: ICreateOnSiteOrder) {
    this.user = onsiteOrder.user;
    this.userId = onsiteOrder.userId;
    this.checkTotal = "0.00";
    this.status = EStatusOrder.ENABLE;
    this.products = [];
    this.payment = [];
    this.selltype = ESellTypeOrder.ON_SITE_ORDER;
    this.tableNum = onsiteOrder.tableNum;
    this.table = onsiteOrder.table;
  }
}
