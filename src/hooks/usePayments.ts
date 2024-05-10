import axios from "axios";
import { Payment } from "../types/payment";
import { useState } from "react";

export default function UsePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const [payment, setPayment] = useState<Payment>();

  const createPayment = async (payment: Payment) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://tomate-server.onrender.com/payments",
        payment
      );

      const newPayment = await res.data;
      if (!newPayment) {
        setIsLoading(false);
        setErrors("No se pudo completar el pago");
        return;
      }
      setIsLoading(false);
      setPayment(newPayment);

      return newPayment;
    } catch (error) {
      setIsLoading(false);
      setErrors("No se pudo completar el pago debido a un error inesperado");
    }
  };
  return {
    isLoading,
    errors,
    payment,
    createPayment,
  };
}
