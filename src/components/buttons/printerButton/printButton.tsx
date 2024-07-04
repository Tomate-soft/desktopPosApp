import { useNavigate } from "react-router-dom";
import UseAccount from "../../../hooks/useAccount";
import UseTable from "../../../hooks/useTable";
import styles from "./printButton.module.css";
import { Bill } from "../../../types/account";
import { useEffect } from "react";
import UsePayment from "../../../hooks/usePayments";
import { Payment } from "../../../types/payment";
import { UsePaymentsStore } from "../../../store/payments/paymenNote.store";
import { usePayStore } from "@/store/payments/payments.store";
import { create } from "zustand";

interface Props {
  setRevolve: (value: string) => void;
  handleLoading: (value: boolean) => void;
  openModal: () => void;
  onClose: () => void;
  currentBill: any;
  diference: number;
  createCurrentPayment: any;
  isDelivery?: boolean;
}
const PrintButton = ({
  isDelivery,
  setRevolve,
  handleLoading,
  openModal,
  onClose,
  currentBill,
  diference,
  createCurrentPayment,
}: Props) => {
  const createPay = usePayStore((state) => state.payTogo);
  const { createPayment, errors } = UsePayment();
  const { handlePrint } = UseAccount();
  const { updateTable, getOneTable, currentTable } = UseTable();
  const { updateBill } = UseAccount();
  const navigate = useNavigate();
  const paymentNote = UsePaymentsStore((state) => state.paymentNote);
  const totalTips = createCurrentPayment?.transactions
    ?.flatMap((transaction) => transaction.tips || [])
    .reduce((acc, tip) => acc + (parseFloat(tip) || 0), 0);

  const revolveCalculate = totalTips
    ? diference * -1 - totalTips
    : diference * -1;

  useEffect(() => {
    getOneTable(currentBill?.table);
  }, []);

  return (
    <button
      disabled={diference > 0}
      onClick={() => {
        if (isDelivery) {
          setRevolve(revolveCalculate.toFixed(2).toString());
          createPay(createCurrentPayment);
          openModal();
          return;
        } else {
          if (currentBill?.note) {
            const constPay = {
              accountId: currentBill?.note?.accountId,
              body: {
                ...createCurrentPayment,
                difference: (diference * -1).toString(),
              },
            };
            setRevolve(revolveCalculate.toFixed(2).toString());
            paymentNote(currentBill.note._id, constPay);
            openModal();
            return;
          }
          handleLoading(true);
          onClose();
          const constPay = {
            ...createCurrentPayment,
            accountId: currentBill._id,
            difference: (diference * -1).toString(),
          };
          console.log("pago");
          console.log(constPay);
          createPayment(constPay);
          if (!errors) {
            setTimeout(() => {
              handleLoading(false);
            }, 400);
            openModal();
            setRevolve(revolveCalculate.toFixed(2).toString());
            handlePrint("ticket", currentBill), onClose();
            return;
            //navigate("/"); ////////////vERIFICAR LA NAVEGACION
          }
          setTimeout(() => {
            handleLoading(false);
          }, 400);
          setRevolve("error");
          onClose();
          //navigate("/"); ////////////vERIFICAR LA NAVEGACION
        }
      }}
      className={styles.printBtn}
    >
      $ Pagar
    </button>
  );
};

export default PrintButton;
