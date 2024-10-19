import { ICreateOnSiteOrder } from "../entities/orders/types.";
import { onSiteActions } from "../libs/onSiteActions";
export const onSiteOrderModel = (data: ICreateOnSiteOrder) => {
  let state = {
    data: data,
    order: {},
  };
  return { state, ...onSiteActions(state) };
};
