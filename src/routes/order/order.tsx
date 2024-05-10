// styles //
import "../../styles/global/global.css";
import styles from "./order.module.css";
// Icons
import backIcon from "../../assets/icon/backArrow.svg";
import backtwo from "../../assets/icon/backTwo.svg";
import sendIcon from "../../assets/icon/sendIcon.svg";
import dividerBtn from "../../assets/icon/dividerBtn.svg";
import separateIcon from "../../assets/icon/separateNotes.svg";
import actionsIcon from "../../assets/icon/actionsIcon.svg";
import printIcon from "../../assets/icon/printIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import rest from "../../assets/icon/rest.svg";
import sum from "../../assets/icon/sum.svg";
import searchIcon from "../../assets/icon/searchIcon.svg";
// Hooks
import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";
// Types and interfaces
import { Product } from "../../types/products";
//Hooks
import UseAccount from "../../hooks/useAccount";
import { useLocation, useNavigate } from "react-router-dom";
import UseOrder from "../../hooks/useOrder";
import UseTable from "../../hooks/useTable";
import { useCurrentCommand } from "../../store/productsInOrder.store";
import { categoriesMap } from "../../mocks/categories";
import { useModal } from "../../hooks/useModal";
import MainKeyboard from "../../components/tools/mainKeyboard/mainKeyboard";
import { useAuthStore } from "../../store/auth/auth.store";
import { SELL_TYPES_PATH } from "../../lib/routes.paths.lib";
import { ON_SITE_ORDER, TO_GO_ORDER } from "../../lib/orders.lib";
import { useToGoOrders } from "../../store/orders/togoOrder.store";
import AddModifier from "../../components/modifiers/addModifier";
import {
  ADD_MODIFIER_MODAL,
  CONFIRM_CHANGES,
  MAIN_KEYBOARD,
} from "../../lib/modals.lib";
import { numsKeys } from "../../lib/components.lib";
import trashBtn from "../../assets/icon/trashIcon.svg";
import arrow from "../../assets/icon/selectArrow.svg";
import { useNotesStore } from "../../store/notes.store";
import ConfirmChanges from "../../components/modals/confirm/confirmChanges";
import { ENABLE_STATUS } from "../../lib/tables.status.lib";
import { useCashierSessionStore } from "../../store/operatingPeriod/cashierSession.store";
import UseVerify from "../../hooks/verifications/useVerify";

interface ToGoOrder {
  code: string /* esto despues sera automatico, agregar un unique*/;
  user: string;
  checkTotal: string;
  status: "enable" | "free" | "forPayment" | "pending";
  products: [];
  payment: [];
}

export default function Order() {
  const confirmChanges = useModal(CONFIRM_CHANGES);
  const isLoadingNote = useNotesStore((state) => state.isLoading);
  const errorsNote = useNotesStore((state) => state.errors);
  const messagesInNote = useNotesStore((state) => state.message);
  const updateNote = useNotesStore((state) => state.updateNote);

  const [selectNote, setSelectNote] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectQuantity, setSelectQuantity] = useState<number | null>(null);
  // MODALS
  const addModifier = useModal(ADD_MODIFIER_MODAL);
  const authData = useAuthStore((state) => state.authData);
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const createToGoOrder = useToGoOrders((state) => state.createNewOrder);
  const updateToGoOrder = useToGoOrders((state) => state.updateOrder);
  const addBillForPayment = useCashierSessionStore(
    (state) => state.addBillForPayment
  );

  //add modifier
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [commandArray, setCommandArray] = useState<Product[]>();
  const { productsArray, getProducts } = useProducts();
  const { createAccount, handlePrint: handlePrintBill } = UseAccount();
  const { addBill, updateBill } = UseAccount();
  const { handlePrint } = UseOrder();
  const { updateTable } = UseTable();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, billCurrent, tableItem, type, toGoOrder } = location.state || {};
  const { currentPeriod } = UseVerify();

  const userName = authData?.payload?.user.name;
  const initialOrderTogo: ToGoOrder = {
    code: "1016",
    user: userName,
    checkTotal: "0.00",
    status: "enable",
    products: [],
    payment: [],
  };

  const isWithNotes = tableItem.bill[0]?.notes?.length > 0;
  const mainKeyboard = useModal(MAIN_KEYBOARD);

  // ZUSTAND /////////////////
  const billCurrentCommand = useCurrentCommand(
    (state) => state.BillCommandCurrent
  );
  const setBillCurrentCommand = useCurrentCommand((state) => state.setState);

  const handleAddedProducts = (item: Product) => {
    /*
    if (isWithNotes) {
     
      setSelectNote({
        ...selectNote,
        products: [...selectNote.products, item],
      });
      return;
    }
      */

    setBillCurrentCommand({
      ...billCurrentCommand,
      products: [...billCurrentCommand.products, item],
    });
  };
  ////////////////////////////

  const handleQuantityChange = (index: number, increment: boolean) => {
    const updatedProducts = [...billCurrentCommand.products];
    const currentQuantity = updatedProducts[index].quantity;
    let newQuantity;

    if (increment) {
      newQuantity = currentQuantity >= 99 ? 99 : currentQuantity + 1;
    } else {
      newQuantity = currentQuantity <= 1 ? 1 : currentQuantity - 1;
    }

    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity: newQuantity,
      priceInSiteBill:
        newQuantity === 1
          ? updatedProducts[index].priceInSite
          : (parseFloat(updatedProducts[index].priceInSite) * newQuantity)
              .toFixed(2)
              .toString(),
      priceToGoBill: (
        parseFloat(updatedProducts[index].priceToGo) * newQuantity
      )
        .toFixed(2)
        .toString(),
      priceCallOrderBill: (
        parseFloat(updatedProducts[index].priceCallOrder) * newQuantity
      )
        .toFixed(2)
        .toString(),
      priceDeliveryBill: (
        parseFloat(updatedProducts[index].priceDelivery) * newQuantity
      )
        .toFixed(2)
        .toString(),
    };

    setBillCurrentCommand({
      ...billCurrentCommand,
      products: [
        ...billCurrentCommand.products.slice(0, index),
        updatedProducts[index],
        ...billCurrentCommand.products.slice(index + 1),
      ],
    });
  };

  useEffect(() => {
    getProducts();
    const filteredProducts = productsArray.filter(
      (item) => item.category === categoriesMap[0]
    );
    setCommandArray(filteredProducts);

    if (type === ON_SITE_ORDER) {
      if (tableItem.bill[0]?.notes && tableItem.bill[0]?.notes?.length > 0) {
        setSelectNote(tableItem.bill[0].notes[0]); // HEALTCHECK
        setBillCurrentCommand(tableItem.bill[0].notes[0]); // HEALTCHECK
        console.log("Entre el IF CON notas y...");
        console.log(selectNote.length); // Esto se consologuea bien
        return;
      }

      if (tableItem.bill[0]) {
        setBillCurrentCommand(tableItem.bill[0]);
        console.log("Entre el IF SIN notas y...");
        console.log(billCurrentCommand);
        return;
      }
      setBillCurrentCommand({
        ...billCurrentCommand,
        tableNum: tableItem.tableNum,
        table: tableItem._id,
        payment: [],
      });
    }
    if (type === TO_GO_ORDER) {
      if (toGoOrder) {
        setBillCurrentCommand(toGoOrder);
        return;
      }
      console.log("Listoa pra crear un pedido para llevar");
      setBillCurrentCommand(initialOrderTogo);
    }

    return () => {
      setBillCurrentCommand({
        ...billCurrentCommand,
        products: [],
      });
      console.log("Aca el auth data");
      console.log(authData); // aca es rollete del bug de volver a v3er los productos.
    };
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        <section>
          {tableItem.bill[0] && tableItem.bill[0].notes.length ? (
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
                        onClick={() => {
                          setToggleStatus(!toggleStatus);
                        }}
                      >
                        <div className={styles.selectTrigger}>
                          <span>
                            {selectNote.noteName ??
                              `Nota  ${selectNote.noteNumber}`}
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
                          {tableItem.bill[0].notes.map((element, index) => (
                            <span
                              key={index}
                              className={styles.option}
                              onClick={() => {
                                setSelectNote(element);
                                setBillCurrentCommand(element);
                              }}
                            >
                              {element.noteName ??
                                `Nota  ${element.noteNumber}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {billCurrentCommand.products?.map((element, index) => (
                    <div className={styles.productContainer} key={index}>
                      {!element.active ? (
                        <div>
                          <button
                            onClick={() => {
                              handleQuantityChange(index, false);
                            }}
                            disabled={
                              billCurrentCommand?.products[index].quantity <=
                                1 || element.active
                            }
                          >
                            <img src={rest} alt="resta-icon" />
                          </button>
                          <span>{element.quantity}</span>
                          <button
                            onClick={() => {
                              handleQuantityChange(index, true);
                            }}
                            disabled={
                              billCurrentCommand?.products[index].quantity >=
                                99 || element.active
                            }
                          >
                            <img src={sum} alt="sumar-icon" />
                          </button>
                        </div>
                      ) : (
                        <h3>{element.quantity}</h3>
                      )}
                      <span
                        onClick={() => {
                          if (element.active) {
                            return;
                          }
                          addModifier.openModal();
                          setSelectedProduct(element);
                        }}
                      >
                        {element.productName}
                      </span>
                      {element.quantity > 1 ? (
                        <p>$ {element.priceInSiteBill}</p>
                      ) : (
                        <p>$ {element.priceInSite}.00</p>
                      )}
                      {!element.active && (
                        <button>
                          <img src={trashBtn} alt="trash-button" />
                        </button>
                      )}
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
                    <span>{`$${billCurrentCommand.checkTotal}`}</span>
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
                <div>
                  {billCurrentCommand.products?.map((element, index) => (
                    <div className={styles.productContainer} key={index}>
                      {!element.active ? (
                        <div>
                          <button
                            onClick={() => {
                              handleQuantityChange(index, false);
                            }}
                            disabled={
                              billCurrentCommand.products[index].quantity <=
                                1 || element.active
                            }
                          >
                            <img src={rest} alt="resta-icon" />
                          </button>
                          <span>{element.quantity}</span>
                          <button
                            onClick={() => {
                              handleQuantityChange(index, true);
                            }}
                            disabled={
                              billCurrentCommand.products[index].quantity >=
                                99 || element.active
                            }
                          >
                            <img src={sum} alt="sumar-icon" />
                          </button>
                        </div>
                      ) : (
                        <h3>{element.quantity}</h3>
                      )}
                      <span
                        onClick={() => {
                          if (element.active) {
                            return;
                          }
                          addModifier.openModal();
                          setSelectedProduct(element);
                        }}
                      >
                        {element.productName}
                      </span>
                      {element.quantity > 1 ? (
                        <p>$ {element.priceInSiteBill}</p>
                      ) : (
                        <p>$ {element.priceInSite}.00</p>
                      )}
                      {!element.active && (
                        <button>
                          <img src={trashBtn} alt="trash-button" />
                        </button>
                      )}
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
                    <span>{`$${billCurrentCommand.checkTotal}`}</span>
                  </div>
                </div>
              </div>
            </>
          )}
          <div>
            <button onClick={mainKeyboard.openModal}>
              <img src={searchIcon} alt="search-icon" />
            </button>
            {numsKeys.map((element, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectQuantity(element);
                }}
              >
                {element}
              </button>
            ))}
            <button>
              <img src={backtwo} alt="backIcon" />
            </button>
          </div>
        </section>
        <div>
          <section className={styles.sectionContainerProducts}>
            {productsArray &&
              commandArray?.map((item, index) => (
                <section
                  key={index}
                  className={styles.containerProduct}
                  onClick={() => {
                    handleAddedProducts(item);
                  }}
                >
                  <p>{item.productName}</p>
                </section>
              ))}
          </section>
          <section className={styles.sectionContainerCategories}>
            {categoriesMap?.map((itemI, index) => (
              <section
                key={index}
                className={styles.containerCategories}
                onClick={() => {
                  const productsFiltered = productsArray.filter(
                    (item) => item.category === itemI
                  );
                  setCommandArray(productsFiltered);
                }}
              >
                <p>{itemI}</p>
              </section>
            ))}
          </section>
        </div>
      </main>
      {mainKeyboard.isOpen && mainKeyboard.modalName === MAIN_KEYBOARD ? (
        <MainKeyboard
          addProduct={handleAddedProducts}
          products={productsArray}
          isOpen={mainKeyboard.isOpen}
          onClose={mainKeyboard.closeModal}
        >
          Buscar
        </MainKeyboard>
      ) : null}
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
        <ConfirmChanges
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
          loading={isLoadingNote}
          errors={errorsNote}
        >
          {""}
        </ConfirmChanges>
      ) : null}
      <footer className={styles.footer}>
        <button onClick={() => navigate(`/${SELL_TYPES_PATH}`)}>
          <img src={backIcon} alt="back-icon" />
          Atrás
        </button>
        <div>
          <button>
            <img src={separateIcon} alt="separate-icon" />
            Separar notas
          </button>
          <button>
            <img src={actionsIcon} alt="action-icon" />
            Mas acciones
          </button>
          <img src={dividerBtn} alt="divider-buttons" />
          <button
            onClick={() => {
              {
                /* handlePrintBill("billPrint", billCurrentCommand),*/
              }
              updateBill("forPayment", billCurrent, billCurrentCommand);
              updateTable("forPayment", _id);
              // vamos a mandar el indice 0 desde el periodo operativo actual
              const elasticBalnceChargeBills =
                currentPeriod[0]?.sellProcess?.length < 2
                  ? currentPeriod[0]?.sellProcess[0]._id
                  : currentPeriod[0]?.sellProcess[0]?.bills?.length >
                    currentPeriod[0]?.sellProcess[1]?.bills?.length
                  ? currentPeriod[0]?.sellProcess[1]._id
                  : currentPeriod[0]?.sellProcess[0]._id;
              console.log(elasticBalnceChargeBills);
              addBillForPayment(elasticBalnceChargeBills, billCurrent._id);
              logOutRequest();
            }}
            disabled={!billCurrent?.products}
            className={styles.printButton}
          >
            <img src={printIcon} alt="print-icon" />
            Imprimir
          </button>
        </div>
        {addModifier.isOpen && addModifier.modalName === ADD_MODIFIER_MODAL ? (
          <AddModifier
            isOpen={addModifier.isOpen}
            onClose={addModifier.closeModal}
            product={selectedProduct}
          >
            {""}
          </AddModifier>
        ) : null}
        <button
          className={styles.printButton}
          onClick={async () => {
            console.log(billCurrentCommand);
            if (type === ON_SITE_ORDER) {
              if (isWithNotes) {
                const dataTransfer = {
                  body: {
                    products: billCurrentCommand.products,
                    checkTotal: billCurrentCommand.checkTotal,
                  },
                  accountId: tableItem.bill[0]._id,
                };
                console.log(dataTransfer);
                updateNote(selectNote._id, dataTransfer);
                confirmChanges.openModal();
                return;
              }
              try {
                if (!billCurrent) {
                  let newBill = await createAccount(billCurrentCommand);
                  updateTable(ENABLE_STATUS, _id);
                  handlePrint(billCurrentCommand);
                  addBill(newBill._id, _id);
                  logOutRequest();
                  return;
                }
                updateBill("enable", billCurrent, billCurrentCommand);
                handlePrint(billCurrentCommand);
                logOutRequest();
              } catch (error) {
                console.error("Error:", error);
              }
            }
            if (type === TO_GO_ORDER) {
              if (toGoOrder) {
                console.log("Solicitud de actualizacion");
                updateToGoOrder(toGoOrder._id, billCurrentCommand);
                logOutRequest();
                return;
              }
              console.log("creacion de pedido");
              createToGoOrder(billCurrentCommand);
              logOutRequest();
            }
          }}
          disabled={billCurrentCommand.products.length < 1}
        >
          <img src={sendIcon} alt="send-icon" />
          Enviar
        </button>
      </footer>
    </div>
  );
}
