import { IProduct } from '../products/types'

export enum EStatusOrder {
  PENDING = 'pending',
  ENABLE = 'enable',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
  FOR_PAYMENT = 'forPayment'
}

export interface IOrder {
  user: string
  products: IProduct[]
}
