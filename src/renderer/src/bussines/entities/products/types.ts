import { ESellTypeOrder } from '../sellTypes/types'

export enum EProductStatus {
  ENABLE = 'enable',
  DISABLE = 'disable'
}

type TPrice = {
  name: string
  price: number
}

export interface IPrices {
  [ESellTypeOrder.ON_SITE_ORDER]: TPrice
  [ESellTypeOrder.TOGO_ORDER]: TPrice
  [ESellTypeOrder.RAPPI_ORDER]: TPrice
  [ESellTypeOrder.PHONE_ORDER]: TPrice
}

export interface IProduct {
  quanity: number
  productName: string
  prices: IPrices
}
