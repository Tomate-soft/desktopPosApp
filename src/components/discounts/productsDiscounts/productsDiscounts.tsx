import DiscountBoard from "../../discountBoard/discount";
import styles from "./productsDiscounts.module.css";
import rightArrow from "../../../assets/icon/arrowRight.svg";
import arrow from "../../../assets/icon/selectArrow.svg";
import divider from "../../../assets/icon/dividerTransfer.svg";
import { useEffect, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { GENERIC_KEYBOARD_ACTIVE } from "../../genericKeyboard/config";
import { GenericKeyboard } from "../../genericKeyboard/genericKeyboard";
import { SET_PERCENT, SET_QUANTITY } from "../../discountBoard/constants";
import { useAuthStore } from "../../../shared";
import { PRODUCTS_DISCOUNTS } from "../../menus/mainMenu/moreActions/configs/constants";
import { UseActions } from "../../../store/moreActions/moreActions.store";
import axiosInstance from "../../../configs/axios";
import { DISCOUNTS_PATH } from "../../../lib/routes.paths.lib";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function ProductsDiscounts({
  item,
  openModal,
  children,
}: Props) {
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNote, setSelectedNote] = useState();
  const [productSelection, setproductSelection] = useState();
  const [percent, setPercent] = useState("");
  const genericKeyboard = useModal(GENERIC_KEYBOARD_ACTIVE);
  const [mode, setMode] = useState<string>(SET_PERCENT);
  const [isCorrect, setIsCorect] = useState(true);

  const authData = useAuthStore((state) => state.authData);
  const user = authData.payload.user._id;
  const createDiscount = UseActions((state) => state.createDiscount);

  const discountApply =
    mode === SET_PERCENT
      ? (
          (parseFloat(productSelection?.priceInSite) * parseInt(percent)) /
          100
        ).toString()
      : (
          parseFloat(productSelection?.priceInSite) - parseFloat(percent)
        ).toString();

  const data = {
    accountId: item.bill[0].notes?.length < 0 ? selectedNote : item.bill[0]._id,
    discountMount: percent,
    setting: mode,
    discountByUser: user,
    discountFor: "Validacion futura",
  };

  const moi = (
    parseFloat(productSelection?.priceInSite) - parseFloat(discountApply)
  )
    .toFixed(2)
    .toString();
  const discountForBillRoute = {
    ...(selectedNote || item.bill[0]), // Usa selectedNote si está definido, de lo contrario usa item.bill[0]
    products: (selectedNote || item.bill[0]).products.map((element) => {
      if (element.unique === productSelection?.unique) {
        return {
          ...element,
          discount: data,
          priceInSite:
            mode === SET_QUANTITY
              ? discountApply
              : (
                  parseFloat(productSelection?.priceInSite) -
                  parseFloat(discountApply)
                )
                  .toFixed(2)
                  .toString(),
        };
      }
      return element;
    }),
    checkTotal: (
      parseFloat((selectedNote || item.bill[0]).checkTotal) -
      parseFloat(discountApply)
    ).toString(),
  };
  useEffect(() => {
    if (item.bill[0].notes.length > 0) {
      setSelectedNote(item.bill[0].notes[0]);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3>1.- Selecciona producto</h3>
            <div>
              <div className={styles.head}>
                <div>
                  {item.bill[0]?.notes.length > 0 ? (
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
                selectedNote.products.length
                  ? selectedNote.products.map(
                      (element, index) =>
                        !element.discount && (
                          <div className={styles.productBox} key={index}>
                            <span>{element.productName}</span>
                            <input
                              type="radio"
                              name="productSelection"
                              onChange={() => {
                                console.log(
                                  parseFloat(
                                    selectedNote?.checkTotal ||
                                      item.bill[0]?.checkTotal ||
                                      "0" // Valor por defecto '0' si no hay checkTotal válido
                                  ) - parseFloat(discountApply || "0") // Valor por defecto '0' si discountApply no es válido
                                );

                                console.log(selectedNote?.checkTotal);
                                console.log(item.bill[0]?.checkTotal);
                                setproductSelection(element);
                              }}
                            />
                          </div>
                        )
                    )
                  : item.bill[0].products.map(
                      (element, index) =>
                        !element.discount && (
                          <div className={styles.productBox} key={index}>
                            <span>{element.productName}</span>
                            <input
                              type="radio"
                              name="productSelection"
                              onChange={() => {
                                console.log(
                                  parseFloat(
                                    selectedNote?.checkTotal ||
                                      item.bill[0]?.checkTotal ||
                                      "0" // Valor por defecto '0' si no hay checkTotal válido
                                  ) - parseFloat(discountApply || "0") // Valor por defecto '0' si discountApply no es válido
                                );

                                console.log(selectedNote);
                                console.log(item.bill[0]?.checkTotal);
                                setproductSelection(element);
                              }}
                            />
                          </div>
                        )
                    )}
              </div>
            </div>
          </div>
          <div>
            <h3>2.-Ingresa descuento</h3>
            <DiscountBoard
              mode={mode}
              settingMode={setMode}
              percent={percent}
              setting={setPercent}
            >
              ea la marea
            </DiscountBoard>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              console.log(discountForBillRoute);
              genericKeyboard.openModal();
            }}
            disabled={
              parseFloat(discountApply) < 1 ||
              parseFloat(discountApply) >=
                parseFloat(productSelection?.priceInSite) - 1 ||
              (parseFloat(percent) >= 100 && mode === SET_PERCENT) ||
              (parseFloat(percent) <= 0 && mode === SET_PERCENT) ||
              !percent
            }
          >
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
            data={discountForBillRoute}
            payload={data}
            keyAction={PRODUCTS_DISCOUNTS}
            actionType={createDiscount}
          >
            Ingresa la descripción del descuento
          </GenericKeyboard>
        </>
      ) : null}
    </div>
  );
}
