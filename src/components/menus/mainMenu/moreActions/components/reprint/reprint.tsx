import { Bill } from "@/types/account";
import styles from "./reprint.module.css";
import questionIcon from "@/assets/icon/questionsIcon.svg";

interface Props {
  children: any;
  handleLoading: any;
  currentBill: Bill;
  openModal: any;
}

export default function ReprintModal({
  children,
  openModal,
  currentBill,
  handleLoading,
}: Props) {
  return (
    <main className={styles.container}>
      <div>
        <img src={questionIcon} alt="question-icon"></img>
        <h3>¿Reimprimir cuenta?</h3>
        <div>
          <button>Confirmar</button>
        </div>
      </div>
    </main>
  );
}
