import { OnSiteOrder } from '../entities/orders/order'

export const onSiteActions = (state) => ({
  createOrder: () => {
    const newOrder = new OnSiteOrder(state.data)
    state.order = newOrder
  },

  showOrder: () => {
    console.log(state.order)
  }
})
