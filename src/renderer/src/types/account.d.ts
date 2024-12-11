import { Product } from './products'

export interface Printer {
  printerName: string
  tcp: string
}

export interface Bill {
  user?: string
  products?: Product[]
  table?: string | undefined
}
