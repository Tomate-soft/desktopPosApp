//styles
import "../../styles/global/global.css";
import styles from "./restaurant.module.css";

import HeaderTwo from "../../components/headers/headerTwo/headerTwo";

// Vars
import TableBox from "../../components/tableBox/tableBox";
import { useEffect, useState } from "react";
import UseTable from "../../hooks/useTable";
import { useModal } from "../../hooks/useModal";
import { OPEN_MORE_ACTIONS } from "../../configs/consts";
import MoreActionsMenu from "../../components/menus/mainMenu/moreActions/moreActionsMenu";
// Dependecies
// Hooks
import { useAuthStore } from "../../store/auth/auth.store";
import { ADMIN } from "../../components/tools/confirmPassword/lib";
import { ON_SITE_ORDER } from "../../lib/orders.lib";
import ExceptionMessages from "../../components/modals/exceptionMessages/exceptionMessages";
import { EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL } from "../../lib/modals.lib";
import UseCashierException from "../../hooks/exceptions/useCashierException";
import { useCurrentCommand } from "../sells/imports";
import RestaurantFooter from "./footer";

export default function Restaurant() {
  const authData = useAuthStore((state) => state.authData);
  //! TODO SWR ✨
  // const { data } = useSWR()

  const [idTable, setIdTable] = useState();
  const { getTables, tablesArray } = UseTable();
  const openMoreActions = useModal(OPEN_MORE_ACTIONS);
  const avalaibleTables = authData?.payload?.user?.tables;
  const isAdmin =
    authData?.payload?.user?.role?.role.value === ADMIN ? true : false;

  const setSillCurrentCommand = useCurrentCommand((state) => state.setState);

  //exceptions
  const cashierSessionException = useModal(
    EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL
  );

  UseCashierException(cashierSessionException.openModal);
  useEffect(() => {
    getTables();
    return () => {
      setSillCurrentCommand({
        sellType: "n/A",
        user: "Moises",
        checkTotal: "0.00",
        products: [],
        status: "enable",
        tableNum: "s/N",
        table: undefined,
      });
    };
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo sellType="Restaurante" />
      <main className={styles.mainSection}>
        {openMoreActions.isOpen &&
        openMoreActions.modalName === OPEN_MORE_ACTIONS ? (
          <MoreActionsMenu
            type={ON_SITE_ORDER}
            isOpen={openMoreActions.isOpen}
            onClose={openMoreActions.closeModal}
            item={idTable}
          ></MoreActionsMenu>
        ) : null}
        {(isAdmin ? tablesArray : avalaibleTables)?.map((item: any) => (
          <div className={styles.grid}>
            <TableBox
              item={item}
              route={"/restaurant-order/:item"}
              openModal={openMoreActions.openModal}
              set={setIdTable}
            />
          </div>
        ))}
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
      <RestaurantFooter />
    </div>
  );
}
