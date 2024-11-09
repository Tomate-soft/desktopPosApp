import { OnSiteOrder, ToGoOrder } from "../entities/orders/order";
import { IOrder } from "../entities/orders/types.";

export enum EOrderType {
  ON_SITE_ORDER = "ON_SITE_ORDER",
  TO_GO_ORDER = "TOGO_ORDER",
}

interface ManagerParams {
  sellType: string;
  orderParams: IOrder;
  table: string;
}

export function CreateOrderManager({
  sellType,
  orderParams,
  table,
}: ManagerParams) {
  if (sellType === EOrderType.ON_SITE_ORDER) {
    return new OnSiteOrder(orderParams, table);
  }
  if (sellType === EOrderType.TO_GO_ORDER) {
    return new ToGoOrder(orderParams);
  }
}
