import { create } from "zustand";
import { getProductsService } from "../services/getproducts";

type Product = {
  _id: string;
  code: string;
  category: string;
  productName: string;
  priceInSite: string;
  priceToGo: string;
  priceCallOrder: string;
  priceDelivery: string;
  status: "enabled" | "disabled";
  quantity: number;
  priceInSiteBill: string;
  priceToGoBill: string;
  priceCallOrderBill: string;
  priceDeliveryBill: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  getProducts: () => Promise<void>;
  productsArray: Product[];
}

export const useProductsStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    getProducts: async () => {
      set({ isLoading: true });
      try {
        const res = await getProductsService();
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudieron traer los productos",
          });
          throw new Error("No se pudieron traer las productos");
        }
        set({ isLoading: false, productsArray: res.data });
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `Ha ocurrido algo inesperado`,
        });
        console.error(
          `Ha ocurrido algo inesperado: mas informacion del error: ${error}`
        );
      }
    },
    productsArray: [],
  };
});
