import styles from "./separateChecks.module.css";
import addIcon from "../../assets/icon/addItemIcon.svg";
import divider from "../../assets/icon/dividerInNote.svg";
import trashIcon from "../../assets/icon/trashIcon.svg";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { updateBillProps } from "../../store/bill.store";

interface Props {
  item: any;
  openModal: any;
}

export default function SeparateChecks({ item, openModal }: Props) {
  const [separateNotes, setSeparateNotes] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [enableNote, setEnableNote] = useState<any[]>([]);

  const createNotes = updateBillProps((state) => state.createNotes);

  function handleProducts(product: any) {
    if (
      selectedProducts.some(
        (selectedElement) => selectedElement.unique === product.unique
      )
    ) {
      // El producto ya está seleccionado, lo filtramos
      const updatedProducts = selectedProducts.filter(
        (selectedElement) => selectedElement.unique !== product.unique
      );
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  }

  const NOTE_TEMPLATE = {
    checkCode: `0${
      item.bill[0]?.tableNum
    }00${item.bill[0]?.billCode.toString()}`,
    accountId: item.bill[0]?._id,
    paymentCode: "aca clavamos el pago",
    sellType: item.bill[0]?.sellType,
    user: item.bill[0]?.user,
    products: [],
    checkTotal: "esto se renombrar a noteTotal",
    status: "enable",
    cashier: "revisar esto",
    paymentDate: "inesceria creo, refvisar...",
  };

  useEffect(() => {
    if (!item.bill[0]?.notes.length) {
      const updatedProducts = item.bill[0]?.products.flatMap((element: any) => {
        if (element.quantity > 1) {
          const products = [];
          for (let i = 0; i < element.quantity; i++) {
            products.push({ ...element, quantity: 1, unique: uuidv4() });
          }
          return products;
        } else {
          return { ...element, unique: uuidv4() };
        }
      });

      if (!item.bill[0]) {
        return;
      }
      setSeparateNotes([
        { ...NOTE_TEMPLATE, products: updatedProducts },
        { ...NOTE_TEMPLATE },
      ]);
      return;
    }
    const updatedNotes = [...item.bill[0]?.notes];
    /*
    const newData = updatedNotes.map((element, index) => {
      console.log(element);
      return {
        ...NOTE_TEMPLATE,
        noteNumber: element.noteNumber,
        products: element.products,
      };
    }); 
    */
    setSeparateNotes(updatedNotes);
  }, [createNotes]);

  return (
    <article className={styles.container}>
      <div className={styles.notesContainer}>
        {!item.bill[0] ? (
          <>No hay cuentas abiertas en esta mesa</>
        ) : (
          <>
            {separateNotes && separateNotes.length > 0 ? (
              <>
                {separateNotes.map((noteElement, index) => (
                  <div>
                    <div>
                      <div>
                        <h3>Mesa: 0{item.tableNum}</h3>
                        <h3>Nota: 0{index + 1}</h3>
                      </div>
                      <img src={divider} alt="divider-icon" />
                    </div>
                    <div className={styles.productsContainer}>
                      {noteElement?.products.map((element: any, index: any) => (
                        <div className={styles.productBox} key={index}>
                          <div>
                            <span>{element.quantity}</span>
                            <span>{element.productName}</span>
                          </div>
                          <input
                            type="checkbox"
                            className={styles.check}
                            checked={selectedProducts.some(
                              (selectedItem) =>
                                selectedItem.unique === element.unique
                            )}
                            onChange={() => {
                              if (!enableNote.length) {
                                setEnableNote([noteElement]);
                              }
                              const isExist = enableNote.some(
                                (note) =>
                                  note.noteNumber === noteElement.noteNumber
                              );

                              if (!isExist) {
                                setEnableNote([...enableNote, noteElement]);
                              } else {
                                setEnableNote(
                                  enableNote.filter(
                                    (note) =>
                                      note.noteNumber !== noteElement.noteNumber
                                  )
                                );
                              }

                              handleProducts(element);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <button /*   enableNote.some(
                            (note) => note.noteNumber === noteElement.noteNumber
                          ) || */
                        disabled={
                          (enableNote.length === 0 &&
                            selectedProducts.length === 0) ||
                          selectedProducts.length === 0 ||
                          (noteElement.products.some((prod: any) =>
                            selectedProducts.some(
                              (selProd: any) => selProd.unique === prod.unique
                            )
                          ) &&
                            selectedProducts &&
                            selectedProducts.length > 0)
                        }
                        onClick={() => {
                          setEnableNote([]);
                          if (selectedProducts.length > 0) {
                            setSeparateNotes((prevSeparateNotes) => {
                              if (!prevSeparateNotes) {
                                return prevSeparateNotes;
                              }
                              if (index !== -1) {
                                const updatedNotes = [...prevSeparateNotes];
                                updatedNotes[index].products.push(
                                  ...selectedProducts
                                );
                                updatedNotes.forEach((note, i) => {
                                  if (i !== index) {
                                    updatedNotes[i].products = updatedNotes[
                                      i
                                    ].products.filter(
                                      (product: any) =>
                                        !selectedProducts.includes(product)
                                    );
                                  }
                                });
                                return updatedNotes;
                              }

                              return prevSeparateNotes;
                            });

                            setSelectedProducts([]);
                          }
                        }}
                      >
                        Mover aquí
                      </button>
                    </div>
                  </div>
                ))}
                <div>
                  <button
                    onClick={() => {
                      const updateNotes = [
                        ...separateNotes,
                        { ...NOTE_TEMPLATE },
                      ];
                      setSeparateNotes(updateNotes);
                    }}
                  >
                    <img src={addIcon} alt="icon" />
                  </button>
                  <button
                    disabled={
                      separateNotes.length <= 2 ||
                      separateNotes[separateNotes.length - 1]._id
                    }
                    onClick={() => {
                      const productsLastNote = [
                        ...separateNotes[separateNotes.length - 1].products,
                      ];
                      const firstNoteProducts = [...separateNotes[0].products];
                      const updatedFirstNoteProducts =
                        firstNoteProducts.concat(productsLastNote);

                      const updatedNotes = [
                        {
                          ...separateNotes[0],
                          products: updatedFirstNoteProducts,
                        },
                        ...separateNotes.slice(1, -1),
                      ];

                      setSeparateNotes(updatedNotes);
                    }}
                  >
                    <img src={trashIcon} alt="icon" />
                  </button>
                </div>
              </>
            ) : (
              <h1>MESA NO ACTIVA</h1>
            )}
          </>
        )}
      </div>
      <div className={styles.footerModal}>
        <h4>Cantidad de notas: {separateNotes?.length}</h4>
        <button
          disabled={!item.bill[0]}
          onClick={() => {
            console.log(separateNotes, item.bill[0]._id);
            if (separateNotes?.length) {
              openModal();
              createNotes(separateNotes, item.bill[0]._id);
            }
          }}
        >
          Guardar
        </button>
      </div>
    </article>
  );
}
