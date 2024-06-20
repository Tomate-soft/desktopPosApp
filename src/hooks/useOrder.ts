import axios from "axios";
// types
import { Bill } from "../types/account";

export default function UseOrder() {
  const handlePrint = async (form: Bill) => {
    const printersArray = [
      { printerId: "192.168.1.70", position: "Bebidas sin alcohol" },
      { printerId: "192.168.1.70", position: "Bebidas con alcohol" },
      { printerId: "192.168.1.70", position: "Medias ordenes" },
      { printerId: "192.168.1.70", position: "Postres" },
      { printerId: "192.168.1.70", position: "caja" },
      { printerId: "192.168.1.70", position: "comandas" },
    ];

    const commandProducts = form.products.filter(
      (item) => item.active === false
    );
    console.log(commandProducts);

    printersArray?.forEach(async (item) => {
      const currentPrinter = item.position;

      const commandProductsFilter = commandProducts.filter(
        (item) => item.category === currentPrinter
      );
      try {
        const data = {
          items: commandProductsFilter,
          total: 46.97,
          tcp: item.printerId,
          position: item.position,
        };
        if (commandProductsFilter.length <= 0) return;
        await axios.post("http://localhost:8000/print/order", data);
        console.log("Ticket enviado para impresión");
      } catch (error) {
        console.error("Error al enviar el ticket para impresión", error);
      }
    });
  };

  return {
    handlePrint,
  };
}
