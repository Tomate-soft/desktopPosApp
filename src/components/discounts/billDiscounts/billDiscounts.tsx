import DiscountBoard from "../../discountBoard/discount";
import styles from "./billDiscounts.module.css";
import rightArrow from "../../../assets/icon/arrowRight.svg";
import table from "./../../../assets/icon/tableActive.svg";
import { useState } from "react";
import { GENERIC_KEYBOARD_ACTIVE } from "../../genericKeyboard/config";
import { GenericKeyboard } from "../../genericKeyboard/genericKeyboard";
import { useModal } from "../../../hooks/useModal";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function BillDiscount({ item, openModal, children }: Props) {
  const [noteForDiscount, setNoteForDiscount] = useState();
  const genericKeyboard = useModal(GENERIC_KEYBOARD_ACTIVE);

  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3> Descuento a mesa: {item.tableNum}</h3>
            <div>
              <img src={table} alt="table-icon" className={styles.table} />
              <strong>{item.tableNum}</strong>
            </div>
          </div>
          <div>
            <h3>Ingresa descuento</h3>
            <DiscountBoard>Descuentos en mesa</DiscountBoard>
          </div>
        </div>
        <div>
          <button onClick={genericKeyboard.openModal}>
            <img src={rightArrow} alt="right-arrow" />
            Siguiente
          </button>
        </div>
      </div>
      {genericKeyboard.isOpen &&
      genericKeyboard.modalName === GENERIC_KEYBOARD_ACTIVE ? (
        <>
          <GenericKeyboard
            isOpen={genericKeyboard.isOpen}
            onClose={genericKeyboard.closeModal}
            openModal={openModal}
          >
            Ingresa la descripción del descuento
          </GenericKeyboard>
        </>
      ) : null}
    </div>
  );
}
