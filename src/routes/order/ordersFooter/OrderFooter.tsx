import { useNavigate } from "react-router-dom";
import styles from "../order.module.css";
import { SELL_TYPES_PATH } from "@/lib/routes.paths.lib";
import backIcon from "@/assets/icon/backArrow.svg";
import separateIcon from "@/assets/icon/separateNotes.svg";
import actionsIcon from "@/assets/icon/actionsIcon.svg";
import dividerBtn from "@/assets/icon/dividerBtn.svg";
import printIcon from "@/assets/icon/printIcon.svg";
import sendIcon from "@/assets/icon/sendIcon.svg";

interface OrderFooterProps {
  handlePrint: any;
  billCurrent: any;
  sendAction: any;
  sendDisabled: boolean;
}

export default function OrderFooter({
  handlePrint,
  billCurrent,
  sendAction,
  sendDisabled,
}: OrderFooterProps) {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <button onClick={() => navigate(`/${SELL_TYPES_PATH}`)}>
        <img src={backIcon} alt="back-icon" />
        Atrás
      </button>
      <div>
        <button>
          <img src={separateIcon} alt="separate-icon" />
          Separar notas
        </button>
        <button>
          <img src={actionsIcon} alt="action-icon" />
          Mas acciones
        </button>
        <img src={dividerBtn} alt="divider-buttons" />
        <button
          onClick={handlePrint}
          disabled={!billCurrent?.products}
          className={styles.printButton}
        >
          <img src={printIcon} alt="print-icon" />
          Imprimir
        </button>
      </div>
      <button
        className={styles.printButton}
        onClick={sendAction}
        disabled={sendDisabled}
      >
        <img src={sendIcon} alt="send-icon" />
        Enviar
      </button>
    </footer>
  );
}
