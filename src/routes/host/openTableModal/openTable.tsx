import { Table } from "@/routes/tablesControl/type";
import styles from "./openTable.module.css";
import CloseButton from "@/components/buttons/CloseButton/closeButton";
import incrementIcon from "@/assets/icon/incrementxl.svg";
import { useState } from "react";
import UseTable from "@/hooks/useTable";
import { PENDING_STATUS } from "@/lib/tables.status.lib";
import { useAuthStore } from "@/shared";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: Table | undefined;
}

export default function OpenTable({ isOpen, onClose, item }: Props) {
  const { updateTable } = UseTable();
  const [clientNumber, setClientNumber] = useState(1);
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  return (
    <div className={styles.container}>
      <div>
        <CloseButton onClose={onClose} />
        <span>Ingresa el numero de comensales</span>
        <div>
          <div>
            <button
              disabled={clientNumber <= 1}
              onClick={() => setClientNumber(clientNumber - 1)}
            >
              -
            </button>
            <span>{clientNumber}</span>
            <button
              disabled={clientNumber >= 99}
              onClick={() => setClientNumber(clientNumber + 1)}
            >
              <img src={incrementIcon} alt="increment-icon" />
            </button>
          </div>
          // todo: falata clavar el numero de clientes a la mesa y a la cuenta
          <button
            onClick={() => {
              updateTable(PENDING_STATUS, item?._id);
              logOutRequest();
            }}
          >
            Habilitar mesa {item?.tableNum}
          </button>
        </div>
      </div>
    </div>
  );
}
