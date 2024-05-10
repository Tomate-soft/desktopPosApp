import DiscountBoard from "../../discountBoard/discount";
import styles from "./productCourtesy.module.css";
import rightArrow from "../../../assets/icon/arrowRight.svg";
import arrow from "../../../assets/icon/selectArrow.svg";
import divider from "../../../assets/icon/dividerTransfer.svg";
import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { GENERIC_KEYBOARD_ACTIVE } from "../../genericKeyboard/config";
import { GenericKeyboard } from "../../genericKeyboard/genericKeyboard";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function ProductsCourtesy({ item, openModal, children }: Props) {
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNote, setSelectedNote] = useState("seleccion");
  const [productSelection, setproductSelection] = useState();
  const genericKeyboard = useModal(GENERIC_KEYBOARD_ACTIVE);

  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3>Selecciona producto</h3>
            <div>
              <div className={styles.head}>
                <div>
                  {item.bill[0]?.notes ? (
                    <div className={styles.containerInput}>
                      <span>{`Mesa ${item.tableNum}`}</span>
                      <div className={styles.categoriesSelect}>
                        <div
                          className={styles.customSelect}
                          onClick={() => {
                            setToggleStatus(!toggleStatus);
                          }}
                        >
                          <div className={styles.selectTrigger}>
                            <span>
                              {selectedNote ? (
                                <>
                                  {selectedNote.noteName
                                    ? selectedNote.noteName.slice(0, 12)
                                    : selectedNote.noteNumber
                                    ? `Nota ${selectedNote.noteNumber}`
                                    : `Nota ${item.bill[0]?.notes[0]?.noteNumber}`}
                                </>
                              ) : (
                                "Notas"
                              )}
                            </span>
                            <img
                              src={arrow}
                              alt=""
                              className={styles.arrowSelect}
                            />
                          </div>
                          <div
                            className={
                              toggleStatus ? styles.options : styles.hidden
                            }
                          >
                            {item.bill[0]?.notes.map((element, index) => (
                              <span
                                className={styles.option}
                                onClick={() => {
                                  setSelectedNote(element);
                                }}
                              >
                                {element.noteName
                                  ? element.noteName
                                  : `Nota ${element.noteNumber}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <img src={divider} alt="divider" />
                </div>
              </div>
              <div className={styles.productsContainer}>
                {selectedNote &&
                selectedNote.products &&
                selectedNote.products.length ? (
                  selectedNote.products.map((element, index) => (
                    <div className={styles.productBox} key={index}>
                      <span>{element.productName}</span>
                      <input
                        type="radio"
                        name="productSelection"
                        onChange={() => {
                          console.log(productSelection);
                          if (
                            setproductSelection &&
                            setproductSelection.unique === element.unique
                          ) {
                            return;
                          }
                          setproductSelection(element);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className={styles.productBoxEmpty}>
                    <h2>Nota actualmente vacia</h2>
                  </div>
                )}
              </div>
            </div>
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
