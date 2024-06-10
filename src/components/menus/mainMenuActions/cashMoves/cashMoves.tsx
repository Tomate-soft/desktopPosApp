import styles from "./cashMoves.module.css";
import cross from "../../../../assets/icon/crossButton.svg";
import tillOne from "../../../../assets/icon/tillMovesCircle.svg";
import orderIcon from "../../../../assets/icon/orderIcon.svg";
import divider from "../../../../assets/icon/dividerTips.svg";
import { useModal } from "../../../../shared";
import { MOJE_CALCULATE } from "../../../../lib/modals.lib";
import MojeCalculate from "./mojeCalculate/mojeCalculate";

interface Props {
  onClose: () => void;
}
export default function CashMoves({ onClose }: Props) {
  const mojeCalculate = useModal(MOJE_CALCULATE);

  return (
    <main className={styles.screen}>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={cross} alt="close-button" />
        </button>
        <div>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={cross} alt="close-button" />
          </button>
          <img src={tillOne} alt="till-icon" />
          <h3>Propinas</h3>
        </div>
        <div>
          <div>
            <div>
              <button>
                Usuario
                <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Propina debito
                <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Propina credito <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Propina total <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Pagado <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Restante <img src={orderIcon} alt="arrow-order" />
              </button>
            </div>
            <img src={divider} alt="divider" />
          </div>
          <div>
            <div>
              <h3>0178 Maria R</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
            </div>
            <div>
              <h3>0178 Maria R</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
            </div>
            <div>
              <h3>0178 Maria R</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
            </div>
            <div>
              <h3>0178 Maria R</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
              <h3>$1,000.00</h3>
            </div>
          </div>
        </div>
        <div>
          <button onClick={mojeCalculate.openModal}>Calcular moje</button>
          <button>Retirar propina</button>
        </div>
      </div>
      {mojeCalculate.isOpen && mojeCalculate.modalName === MOJE_CALCULATE ? (
        <MojeCalculate
          isOpen={mojeCalculate.isOpen}
          onClose={mojeCalculate.closeModal}
        >
          Calcular moje
        </MojeCalculate>
      ) : null}
    </main>
  );
}
