import styles from "./mojeCalculate.module.css";
import tipsCircle from "../../../../../assets/icon/tipsCircle.svg";
import printIcon from "../../../../../assets/icon/printIcon.svg";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}

export default function MojeCalculate({ isOpen, onClose, children }: Props) {
  return (
    <main className={styles.screen}>
      <div>
        <div>
          <div>
            <img src={tipsCircle} alt="tips-icon" />
            <h3>{children}</h3>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div>
          <div>
            <h4>Empleado</h4>
            <h4>0178 María R.</h4>
          </div>
          <div>
            <h4>Venta total</h4>
            <h4>$20,000</h4>
          </div>
          <div>
            <h4>{"Moje (%)"}</h4>
            <input placeholder="0" type="number" />
          </div>
          <div>
            <h4>Moje</h4>
            <h4>$1,200.00</h4>
          </div>
        </div>
        <button>
          <img src={printIcon} alt="print-icon" />
          Imprimir
        </button>
      </div>
    </main>
  );
}
// update
