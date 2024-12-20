import axios from '@renderer/configs/axios' // types
import { Bill } from '../types/account'

export default function UseOrder() {
  const handlePrint = async (form: Bill) => {
    console.log('aca vamos a ver como llega la ainformacionde form al procesod e envio de la orden')
    console.log(form)
    const printersArray = [{ printerId: '192.168.1.66', position: 'Alimentos' }]
    // aqui sacamos lo sproductos que ya se comandaron
    const commandProducts = form.products?.filter((item) => item.active === false)
    // aca estamos trayendo la simpresoras, que aqui es donde podemos traer el array de las que tenemos creadas en el administrador
    printersArray?.forEach(async (item) => {
      const currentPrinter = item.position

      const commandProductsFilter = commandProducts?.filter(
        (item) => item?.subcategory === currentPrinter
      )

      try {
        const data = {
          items: commandProductsFilter,
          total: 46.97,
          tcp: item.printerId,
          position: item.position
        }
        if (commandProductsFilter.length <= 0) return

        await axios.post('http://localhost:8114/printer/order', {
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
