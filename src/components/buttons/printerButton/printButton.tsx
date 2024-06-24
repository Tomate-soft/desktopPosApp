import { useNavigate } from "react-router-dom";
import UseAccount from "../../../hooks/useAccount";
import UseTable from "../../../hooks/useTable";
import styles from "./printButton.module.css";
import { Bill } from "../../../types/account";
import { useEffect } from "react";
import UsePayment from "../../../hooks/usePayments";
import { Payment } from "../../../types/payment";
import { UsePaymentsStore } from "../../../store/payments/paymenNote.store";

interface Props {
  setRevolve: (value: string) => void;
  handleLoading: (value: boolean) => void;
  openModal: () => void;
  onClose: () => void;
  currentBill: any;
  diference: number;
  createCurrentPayment: Payment;
}
const PrintButton = ({
  setRevolve,
  handleLoading,
  openModal,
  onClose,
  currentBill,
  diference,
  createCurrentPayment,
}: Props) => {
  const { createPayment, errors } = UsePayment();
  const { handlePrint } = UseAccount();
  const { updateTable, getOneTable, currentTable } = UseTable();
  const { updateBill } = UseAccount();
  const navigate = useNavigate();
  const paymentNote = UsePaymentsStore((state) => state.paymentNote);
  const totalTips = createCurrentPayment?.transactions
    ?.flatMap((transaction) => transaction.tips || [])
    .reduce((acc, tip) => acc + (parseFloat(tip) || 0), 0);

  const revolveCalculate = diference * -1 - totalTips;

  useEffect(() => {
    console.log(totalTips);
    getOneTable(currentBill?.table);
    console.log(createCurrentPayment);
  }, [totalTips, createCurrentPayment]);

  return (
    <button
      disabled={diference > 0}
      onClick={() => {
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
      }}
      className={styles.printBtn}
    >
      $ Pagar
    </button>
  );
};

export default PrintButton;
