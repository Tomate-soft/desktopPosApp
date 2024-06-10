import styles from "./tableBox.module.css";
// Hooks
import { useAccount } from "../../services/createAccount";
import { useNavigate } from "react-router-dom";
import tableFree from "../../assets/icon/tableFree.svg";
import tablePending from "../../assets/icon/tablePending.svg";
import tableEnable from "../../assets/icon/tableActive.svg";
import tablePayment from "../../assets/icon/tableForPayment.svg";
import moreActionsIcon from "../../assets/icon/moreActionsIcon.svg";
// types
import UseTable from "../../hooks/useTable";
import { useAuthStore } from "../../store/auth/auth.store";
import {
  ENABLE_STATUS,
  FOR_PAYMENT_STATUS,
  FREE_STATUS,
  PENDING_STATUS,
} from "../../lib/tables.status.lib";
import { HOSTESS, WAITER } from "../tools/confirmPassword/lib";
import { ON_SITE_ORDER } from "../../lib/orders.lib";
import { useEffect } from "react";
import UseVerify from "../../hooks/verifications/useVerify";
interface Props {
  item?: any;
  route?: string;
  openModal?: () => void;
  set?: (arg: any) => void;
}
export default function TableBox({ item, route, openModal, set }: Props) {
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const authData = useAuthStore((state) => state.authData);
  const { loading, newAccount }: any = useAccount();
  const navigate = useNavigate();
  const { updateTable } = UseTable();
  const userRole = authData.payload?.user?.role?.role.value;
  const { cashierAvailable } = UseVerify();

  const handleclick = () => {
    console.log(userRole);
    console.log(cashierAvailable);
    if (cashierAvailable) {
      if (
        item.status !== FREE_STATUS &&
        item.status !== PENDING_STATUS &&
        item.status !== ENABLE_STATUS
      ) {
        return;
      }
      if (userRole === HOSTESS) {
        // Esto lo vamos a quitar por que, la hostess debe de cambiar desde el panel de mesas no de aca
        updateTable(PENDING_STATUS, item._id);
        logOutRequest();
      }
      if (userRole === WAITER) {
        if (item.status === FREE_STATUS || item.status === FOR_PAYMENT_STATUS) {
          return;
        }
        if (item.status === PENDING_STATUS) {
          navigate(route, {
            state: {
              tableItem: item,
              _id: item._id,
              type: ON_SITE_ORDER,
            },
          });
          return;
        }
        if (item.status === ENABLE_STATUS) {
          navigate(route, {
            state: {
              tableItem: item,
              _id: item._id,
              billCurrent: item.bill[0],
              type: ON_SITE_ORDER,
            },
          });
          return;
        }
      } else {
        return;
      }
    }
  };

  if (!loading && newAccount?.code === 200) handleclick;
  return (
    <div className={styles.table}>
      <div>
        <span>00.00</span>
        <span>
          <img src="" alt="" />
          04
        </span>
      </div>
      {item && item.status === PENDING_STATUS ? (
        <img src={tablePending} alt="table-pending" />
      ) : item && item.status === ENABLE_STATUS ? (
        <img src={tableEnable} alt="table-enable" />
      ) : item && item.status === FOR_PAYMENT_STATUS ? (
        <img src={tablePayment} alt="table-for-payment" />
      ) : (
        <img src={tableFree} alt="table-free" />
      )}
      <div className={styles.openTable} onClick={handleclick}>
        <p>{item.tableNum}</p>
        <span>{item.server}</span>
      </div>
      <div className={styles.footBox}>
        <button
          onClick={() => {
            if (item.status != ENABLE_STATUS) return;
            set(item);
            openModal();
          }}
        >
          <img src={moreActionsIcon} alt="more-actions" />
        </button>
      </div>
    </div>
  );
}
