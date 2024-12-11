import { IProduct } from '../products/types'
import { IOrder } from './types.'

class Order implements IOrder {
  user: string
  products: IProduct[]

  constructor(order: IOrder) {
    this.user = order.user
    this.products = order.products
  }
}

export class ToGoOrder extends Order {
  constructor(order: IOrder) {
    super(order)
  }
}

export class OnSiteOrder extends Order {
  table: string

  constructor(order: IOrder, table: string) {
    super(order)
    this.table = table
  }
}

class CreateOrder {
  createNewOrder() {
    throw new Error('Method not implemented.')
  }
}

class CreateOnSiteOrder extends CreateOrder {
  createNewOrder(order: IOrder, tableNum: string) {}
}
