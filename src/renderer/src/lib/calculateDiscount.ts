import { SET_PERCENT, SET_QUANTITY } from '@renderer/components/discountBoard/constants'

export const calculateDiscount = (amount: number, quantityDiscount: number, setting: string) => {
  if (setting === SET_PERCENT) {
    return (amount * quantityDiscount) / 100
  }
  if (setting === SET_QUANTITY) {
    return quantityDiscount
  }
  return 0
}