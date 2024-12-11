import { ENABLE_STATUS, FOR_PAYMENT_STATUS } from '@renderer/lib/tables.status.lib'
import {
  BILL_CANCEL,
  BILL_DISCOUNTS,
  BILL_NAME,
  COMMENTS,
  COURTESY_APPLY_BILL,
  COURTESY_APPLY_NOTES,
  COURTESY_APPLY_PRODUCTS,
  MOVE_PRODUCTS,
  MOVE_TABLE,
  NOTES_CANCEL,
  NOTES_DISCOUNTS,
  NOTES_NAME,
  PRODUCTS_CANCEL,
  PRODUCTS_DISCOUNTS,
  REOPEN_ORDER,
  REPRINT_ORDER,
  SEPARATE_CHECKS,
  TO_GO_CANCEL_ORDER,
  TO_GO_COMMENT,
  TO_GO_COURTESY_ORDER,
  TO_GO_COURTESY_PRODUCT,
  TO_GO_DISCOUNT_ORDER,
  TO_GO_DISCOUNT_PRODUCT,
  TO_GO_NAME_ORDER,
  TO_GO_PAYMENT,
  TO_GO_REPRINT_ORDER
} from './constants'

interface Action {
  option: string
  set: string
  enable?: string[]
}
// spanish
export const actionsMenu: Action[] = [
  {
    option: 'Nombre de la cuenta',
    set: BILL_NAME,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Comentarios',
    set: COMMENTS,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Nombre de las notas',
    set: NOTES_NAME,
    enable: [ENABLE_STATUS]
  },

  {
    option: 'Separar notas',
    set: SEPARATE_CHECKS,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Transferir productos',
    set: MOVE_PRODUCTS,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Cambiar mesa',
    set: MOVE_TABLE,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Descuentos en productos',
    set: PRODUCTS_DISCOUNTS,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Descuentos en notas',
    set: NOTES_DISCOUNTS,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Descuentos en cuenta',
    set: BILL_DISCOUNTS,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Cortesías de producto',
    set: COURTESY_APPLY_PRODUCTS,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Cortesías de nota',
    set: COURTESY_APPLY_NOTES,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Cortesía de cuenta',
    set: COURTESY_APPLY_BILL,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Cancelar productos',
    set: PRODUCTS_CANCEL,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Cancelar notas',
    set: NOTES_CANCEL,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Cancelar cuenta',
    set: BILL_CANCEL,
    enable: [ENABLE_STATUS]
  },
  {
    option: 'Reimprimir cuenta',
    set: REPRINT_ORDER,
    enable: [ENABLE_STATUS, FOR_PAYMENT_STATUS]
  },
  {
    option: 'Reabrir cuenta',
    set: REOPEN_ORDER,
    enable: [FOR_PAYMENT_STATUS]
  }
]

export const actionsTogoMenu: Action[] = [
  {
    option: 'Cobrar',
    set: TO_GO_PAYMENT
  },
  {
    option: 'Nombre de la cuenta',
    set: TO_GO_NAME_ORDER
  },
  {
    option: 'Comentarios',
    set: TO_GO_COMMENT
  },
  {
    option: 'Descuento en producto',
    set: TO_GO_DISCOUNT_PRODUCT
  },
  {
    option: 'Descuento en orden',
    set: TO_GO_DISCOUNT_ORDER
  },
  {
    option: 'Cortesia en producto',
    set: TO_GO_COURTESY_PRODUCT
  },
  {
    option: 'Cortesia en orden',
    set: TO_GO_COURTESY_ORDER
  },
  {
    option: 'Cancelar',
    set: TO_GO_CANCEL_ORDER
  },
  {
    option: 'Reimprimir',
    set: TO_GO_REPRINT_ORDER
  }
]
