import axios from '@renderer/configs/axios' // types
import { Bill } from '../types/account'

export default function UseOrder() {
  const handlePrint = async (form: Bill) => {
    const printersArray = [
      { printerId: '192.168.1.91', position: 'Bebidas sin alcohol' },
      { printerId: '192.168.1.91', position: 'Bebidas con alcohol' },
      { printerId: '192.168.1.91', position: 'Medias ordenes' },
      { printerId: '192.168.1.91', position: 'Postres' },
      { printerId: '192.168.1.91', position: 'caja' },
      { printerId: '192.168.1.91', position: 'comandas' },
      { printerId: '192.168.1.91', position: 'Electronics' }
    ]

    const commandProducts = form.products?.filter((item) => item.active === false)

    printersArray?.forEach(async (item) => {
      const currentPrinter = item.position

      const commandProductsFilter = commandProducts?.filter(
        (item) => item?.subcategory === currentPrinter
      )

      console.log(commandProductsFilter)
      try {
        const data = {
          items: commandProductsFilter,
          total: 46.97,
          tcp: item.printerId,
          position: item.position
        }
        if (commandProductsFilter.length <= 0) return

        await axios.post('http://localhost:3000/printer/order', {
          data: commandProductsFilter
        })
        console.log('Ticket enviado para impresión')
      } catch (error) {
        console.error('Error al enviar el ticket para impresión', error)
      }
    })
  }

  return {
    handlePrint
  }
}
