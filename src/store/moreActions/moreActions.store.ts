import { create } from "zustand";
import { MoveTableDto } from "../../types/moreActions";
import {
  SaveBillInTableService,
  UpdatePropInBillService,
} from "../../services/moreActions/moreActions";

export interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  moveBill: (data: MoveTableDto) => Promise<{}>;
}

export const UseActions = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    moveBill: async (data) => {
      set({ isLoading: true });
      try {
        const [firstRequestRes, secondRequestRes] = await Promise.all([
          SaveBillInTableService(data.receivingTableId, data.receivingTable),
          SaveBillInTableService(data.idHost, data.dataHost),
        ]);
        if (!secondRequestRes.data) {
          try {
            const res = await SaveBillInTableService(
              data.idHost,
              data.receivingTable
            );
            set({
              isLoading: false,
              errors: true,
              message: "Se revirtieron los cambios",
            });

            throw new Error(
              "No se pudo realizar el cambio de mesa, se han revertido los cambios"
            );
          } catch (error) {
            set({ isLoading: false, errors: true });
            throw new Error("No se pudo realizar el cambio de mesa");
          }
        }
        if (firstRequestRes && secondRequestRes) {
          const res = await UpdatePropInBillService(data.item.bill[0]._id, {
            transferHistory: [data.item.tableNum],
            tableNum: data.receivingItem.tableNum,
          });
          if (!res.data) {
            set({ message: "No se actualizo el historial de transferencia" });
          }
        }
        const resData = { firstRequestRes, secondRequestRes };
        set({ isLoading: false });
        return resData;
      } catch (error) {
        set({ isLoading: false, errors: true });

        throw new Error(
          `Ha ocurrido algo inesperado. Mas informacion: ${error}`
        );
      }
    },
  };
});
