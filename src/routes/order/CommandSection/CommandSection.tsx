import { ON_SITE_ORDER } from "@/lib/orders.lib";
import styles from "../order.module.css";
import arrow from "@/assets/icon/selectArrow.svg";
import trashBtn from "@/assets/icon/trashIcon.svg";
import NumbersBar from "./NumbersBar/NumbersBar";
import QuantityInterface from "./QuantityInterface.tsx/QuantityInterface";
import {
  calculateBillTotal,
  calculateProductTotal,
} from "@/utils/calculateTotals";

interface Props {
  notesAllow: boolean;
  type: string;
  tableItem: any;
  setToggleStatus: () => void;
  toggleStatus: boolean;
  selectNote: any;
  managementNotes: any;
  settingNotes: (element: any) => void;
  billCurrentCommand: any;
  handleQuantityChange: (index: number, increment: boolean) => void;
  addModifier: any;
  setSelectedProduct: any;
  selectQuantity: number | null;
  mainKeyboard: any;
  setSelectQuantity: any;
}

export default function CommandSection({
  notesAllow,
  type,
  tableItem,
  toggleStatus,
  setToggleStatus,
  selectNote,
  managementNotes,
  settingNotes,
  billCurrentCommand,
  handleQuantityChange,
  addModifier,
  setSelectedProduct,
  selectQuantity,
  mainKeyboard,
  setSelectQuantity,
}: Props) {
  return (
    <section>
      {notesAllow ? (
        <>
          <div>
            <div className={styles.headAccount}>
              <span>
                Cuenta con notas ... Cuenta: 0
                {type === ON_SITE_ORDER ? tableItem.tableNum : "#"}
              </span>
              <div className={styles.containerInput}>
                <div className={styles.categoriesSelect}>
                  <div
                    className={styles.customSelect}
                    onClick={setToggleStatus}
                  >
                    <div className={styles.selectTrigger}>
                      <span>
                        {selectNote?.noteName ??
                          `Nota  ${selectNote?.noteNumber}`}
                      </span>
                      <img src={arrow} alt="" className={styles.arrowSelect} />
                    </div>
                    <div
                      className={toggleStatus ? styles.options : styles.hidden}
                    >
                      {managementNotes.map((element, index) => (
                        <span
                          key={index}
                          className={styles.option}
                          onClick={() => settingNotes(element)}
                        >
                          {element.noteName ?? `Nota  ${element.noteNumber}`}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {billCurrentCommand?.products?.map((element, index) => (
                <div className={styles.pr} key={index}>
                  <div className={styles.productContainer} key={index}>
                    {!element.active ? (
                      <QuantityInterface
                        incrementAction={() => {
                          handleQuantityChange(index, true);
                        }}
                        decrementAction={() => {
                          handleQuantityChange(index, false);
                        }}
                        decrementDisable={
                          billCurrentCommand.products[index].quantity <= 1 ||
                          element.active
                        }
                        incrementDisable={
                          billCurrentCommand.products[index].quantity >= 99 ||
                          element.active
                        }
                        element={element}
                      />
                    ) : (
                      <h3>{element.quantity}</h3>
                    )}
                    <span
                      onClick={() => {
                        if (element.active) {
                          return;
                        }
                        addModifier.openModal();
                        setSelectedProduct({ index: index, product: element });
                      }}
                    >
                      {element.productName}
                    </span>
                    <p>{calculateProductTotal(element)}</p>
                    {!element.active && (
                      <button>
                        <img src={trashBtn} alt="trash-button" />
                      </button>
                    )}
                  </div>
                  {element.dishes &&
                    element.dishes.map((dish, index) => (
                      <div key={index}>
                        <p>{dish.dishesName}</p>
                        {!element.active && (
                          <button>
                            <img src={trashBtn} alt="trash-button" />
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div>
              <span>Cantidad:</span>
              <span>{selectQuantity ? selectQuantity : 1}</span>
            </div>
            <div className={styles.totalContainer}>
              <div>
                <span>Total: </span>
                <span>{`$${calculateBillTotal(
                  billCurrentCommand.products
                )}`}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className={styles.headAccount}>
              <span>
                Cuenta: 0{type === ON_SITE_ORDER ? tableItem.tableNum : "#"}
              </span>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {billCurrentCommand?.products?.map((element, index) => (
                <div key={index} className={styles.pr}>
                  <div className={styles.productContainer}>
                    {!element.active ? (
                      <QuantityInterface
                        incrementAction={() => {
                          handleQuantityChange(index, true);
                        }}
                        decrementAction={() => {
                          handleQuantityChange(index, false);
                        }}
                        decrementDisable={
                          billCurrentCommand.products[index].quantity <= 1 ||
                          element.active
                        }
                        incrementDisable={
                          billCurrentCommand.products[index].quantity >= 99 ||
                          element.active
                        }
                        element={element}
                      />
                    ) : (
                      <h3>{element.quantity}</h3>
                    )}
                    <span
                      onClick={() => {
                        if (element.active) {
                          return;
                        }
                        addModifier.openModal();
                        setSelectedProduct({ index: index, product: element });
                      }}
                    >
                      {element.productName}
                    </span>
                    <p>{calculateProductTotal(element)}</p>
                    {!element.active && (
                      <button>
                        <img src={trashBtn} alt="trash-button" />
                      </button>
                    )}
                  </div>
                  {element.dishes &&
                    element.dishes.map((dish, index) => (
                      <div key={index}>
                        <p>{dish.dishesName}</p>
                        {!element.active && (
                          <button>
                            <img src={trashBtn} alt="trash-button" />
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div>
              <span>Cantidad:</span>
              <span>{selectQuantity ? selectQuantity : 1}</span>
            </div>
            <div className={styles.totalContainer}>
              <div>
                <span>Total: </span>
                <span>${calculateBillTotal(billCurrentCommand.products)}</span>
              </div>
            </div>
          </div>
        </>
      )}
      <NumbersBar
        action={(element) => {
          setSelectQuantity(element);
        }}
        mainKeyboard={mainKeyboard}
      />
    </section>
  );
}
