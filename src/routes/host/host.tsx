//styles
import "../../styles/global/global.css";
import styles from "./host.module.css";
// Icons
import pendingIcon from "../../assets/icon/pending.svg";
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
import freeIcon from "../../assets/icon/freeIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
// Vars
import TableBox from "../../components/tableBox/tableBox";
import UseTable from "../../hooks/useTable";
import { useEffect } from "react";
import { useModal } from "../sells/imports";
import { EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL } from "../../lib/modals.lib";
import ExceptionMessages from "../../components/modals/exceptionMessages/exceptionMessages";
import UseCashierException from "../../hooks/exceptions/useCashierException";
import { useOperationProcess } from "../../store/operatingPeriod/operatingPeriod.store";
// Dependecies

export default function Host() {
  const { tablesArray, getTables } = UseTable();
  const cashierSessionException = useModal(
    EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL
  );

  const operationPeriod = useOperationProcess((state) => state.operatingPeriod);
  const cashierSession = operationPeriod[0]?.sellProcess;
  UseCashierException(cashierSessionException.openModal);
  useEffect(() => {
    getTables();
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        {tablesArray?.map((item: any, index: any) => {
          return (
            <div className={styles.grid} key={index}>
              <TableBox cashierSession={cashierSession} item={item} />
            </div>
          );
        })}
      </main>
      {cashierSessionException.isOpen &&
      cashierSessionException.modalName ===
        EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL ? (
        <ExceptionMessages
          interactive={true}
          isOpen={cashierSessionException.isOpen}
          onClose={cashierSessionException.closeModal}
        >
          No hay cajas abiertas
        </ExceptionMessages>
      ) : null}
      <footer className={styles.footer}>
        <div>
          <span>
            <img src={pendingIcon} alt="pending-icon" />
            En espera
          </span>
          <span>
            <img src={enableIcon} alt="enable-icon" />
            Activa
          </span>
          <span>
            <img src={paymentIcon} alt="payment-icon" />
            Por pagar
          </span>
          <span>
            <img src={freeIcon} alt="free-icon" />
            Libre
          </span>
        </div>
      </footer>
    </div>
  );
}
