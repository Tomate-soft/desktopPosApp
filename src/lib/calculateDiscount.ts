import {
  SET_PERCENT,
  SET_QUANTITY,
} from "@/components/discountBoard/constants";

export const calculateDiscount = (
  amount: number,
  quantityDiscount: number,
  setting: string
) => {
  console.log("amount", amount);
  console.log("quantityDiscount", quantityDiscount);
  console.log("setting", setting);
  if (setting === SET_PERCENT) {
    return (amount * quantityDiscount) / 100;
  }
  if (setting === SET_QUANTITY) {
    return quantityDiscount;
  }
  return 0;
};
