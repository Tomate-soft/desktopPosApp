import styles from "./tableBox.module.css";
// Hooks
import { useAccount } from "../../services/createAccount";
import { useNavigate } from "react-router-dom";
import tableFree from "../../assets/icon/tableFree.svg";
import tablePending from "../../assets/icon/tablePending.svg";
import tableEnable from "../../assets/icon/tableActive.svg";
import tablePayment from "../../assets/icon/tableForPayment.svg";
import moreActionsIcon from "../../assets/icon/moreActionsIcon.svg";
import tableSelected from "@/assets/icon/tableSelected.svg";
import tableIcon from "@/assets/icon/table.svg";
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
import { useEffect, useState } from "react";
import UseVerify from "../../hooks/verifications/useVerify";
import { isButtonElement } from "react-router-dom/dist/dom";
import { backIcon } from "@/shared";
interface Props {
  item?: any;
  route?: string;
  openModal?: () => void;
  set?: (arg: any) => any;
  setting?: (arg: any) => any;
  isEdit?: boolean;
  selectedArray?: any[];
  joinedInInTable?: any;
}
export default function TableBox({
  item,
  route,
  openModal,
  set,
  isEdit,
  selectedArray,
  setting,
  joinedInInTable,
}: Props) {
  const [forceRender, setForceRender] = useState(false); // [1
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const authData = useAuthStore((state) => state.authData);
  const { loading, newAccount }: any = useAccount();
  const navigate = useNavigate();
  const { updateTable } = UseTable();
  const userRole = authData.payload?.user?.role?.role.value;
  const { cashierAvailable } = UseVerify();
  const mainTable =
    selectedArray?.some((i) => i.status === ENABLE_STATUS) ?? false;
  const handleclick = () => {
    console.log("click");
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
  const handleEdit = () => {
    if (mainTable && item.status === ENABLE_STATUS && set) {
      const newArray = selectedArray?.filter((i) => i._id !== item._id);
      set(newArray);
    }
    if (mainTable && item.status === ENABLE_STATUS) return;
    if (selectedArray && set) {
      if (selectedArray.includes(item)) {
        // Filtra el elemento seleccionado fuera del array
        const newArray = selectedArray.filter((i) => i._id !== item._id);
        set(newArray);
      } else {
        // Añade el elemento seleccionado al array
        set([...selectedArray, item]);
      }
    }
  };

  if (!loading && newAccount?.code === 200) handleclick; /* que es esto? */
  return (
    <div
      className={styles.table}
      style={
        joinedInInTable.some((i: any) => i == item.tableNum)
          ? {
              filter: "drop-shadow(0px 0px 6px #fff",
              opacity: "1",
            }
          : !item.availability && item.joinedTables.length <= 0
          ? { opacity: "0.2 " }
          : { opacity: "1" }
      }
    >
      <div>
        <span>00.00</span>
        <span>
          <img src="" alt="" />
          04
        </span>
      </div>
      <>
        {isEdit ? (
          selectedArray?.includes(item) ? (
            <img src={tableSelected} alt="table-selected" />
          ) : (
            item && (
              <>
                {item.status === PENDING_STATUS ? (
                  <img src={tablePending} alt="table-pending" />
                ) : item.status === ENABLE_STATUS ? (
                  <img src={tableEnable} alt="table-enable" />
                ) : item.status === FOR_PAYMENT_STATUS ? (
                  <img src={tablePayment} alt="table-for-payment" />
                ) : (
                  <img src={tableFree} alt="table-free" />
                )}
              </>
            )
          )
        ) : (
          item && (
            <>
              {item.status === PENDING_STATUS ? (
                <img src={tablePending} alt="table-pending" />
              ) : item.status === ENABLE_STATUS ? (
                <img src={tableEnable} alt="table-enable" />
              ) : item.status === FOR_PAYMENT_STATUS ? (
                <img src={tablePayment} alt="table-for-payment" />
              ) : (
                <img src={tableFree} alt="table-free" />
              )}
            </>
          )
        )}
      </>
      <div
        className={styles.openTable}
        onClick={() => {
          if (!item.availability || item.joinedTables.length > 0) return;
          isEdit && item.status != FOR_PAYMENT_STATUS
            ? handleEdit()
            : isEdit && item.status != FOR_PAYMENT_STATUS
            ? handleclick()
            : () => {
                console.log("no se puede seleccionar");
              };
        }}
      >
        <p>{item.tableNum}</p>
        <span>{item.server}</span>
      </div>
      <div
        className={
          item.joinedTables.length <= 0 ? styles.footBox : styles.footBoxBetween
        }
      >
        {item.joinedTables.length > 0 && isEdit && (
          <button
            onClick={() => {
              if (setting) {
                if (joinedInInTable.length > 0) {
                  setting([]);
                  return;
                }
                setting(item?.joinedTables);
              }
            }}
          >
            <img src={tableIcon} alt="more-actions" />
          </button>
        )}
        <button
          onClick={() => {
            if (!item.availability) return;
            if (isEdit) {
              return;
            } else {
              if (item.status != ENABLE_STATUS) return;
              set(item);
              openModal();
            }
          }}
        >
          <img src={moreActionsIcon} alt="more-actions" />
        </button>
      </div>
    </div>
  );
}
