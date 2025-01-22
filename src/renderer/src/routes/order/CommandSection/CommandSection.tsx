import { ON_SITE_ORDER } from '@renderer/lib/orders.lib'
import styles from '../order.module.css'
import arrow from '@renderer/assets/icon/selectArrow.svg'
import trashBtn from '@renderer/assets/icon/trashIcon.svg'
import NumbersBar from './NumbersBar/NumbersBar'
import QuantityInterface from './QuantityInterface.tsx/QuantityInterface'
import { calculateBillTotal, calculateProductTotal } from '@renderer/utils/calculateTotals'
import { formatToCurrency } from '@renderer/utils/formatToCurrency'

interface Props {
  notesAllow: boolean
  type: string
  tableItem: any
  setToggleStatus: () => void
  toggleStatus: boolean
  selectNote: any
  managementNotes: any
  settingNotes: (element: any) => void
  billCurrentCommand: any
  handleQuantityChange: (index: number, increment: boolean) => void
  addModifier: any
  setSelectedProduct: any
  selectQuantity: number | null
  mainKeyboard: any
  setSelectQuantity: any
  deleteProduct: any
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
  deleteProduct
}: Props) {
  return (
    <section>
      {notesAllow ? (
        <>
          <div>
            <div className={styles.headAccount}>
              <span>Cuenta: 0{type === ON_SITE_ORDER ? tableItem.tableNum : '#'}</span>
              <div className={styles.containerInput}>
                <div className={styles.categoriesSelect}>
                  <div className={styles.customSelect} onClick={setToggleStatus}>
                    <div className={styles.selectTrigger}>
                      <span>{selectNote?.noteName ?? `Nota  ${selectNote?.noteNumber}`}</span>
                      <img src={arrow} alt="" className={styles.arrowSelect} />
                    </div>
                    <div className={toggleStatus ? styles.options : styles.hidden}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {billCurrentCommand?.products?.map((_, index, array) => {
                const element = array[array.length - 1 - index] // Accede al elemento desde el final
                return (
                  <div className={styles.pr} key={index}>
                    <div className={styles.productContainer}>
                      {!element.active ? (
                        <QuantityInterface
                          incrementAction={() => {
                            handleQuantityChange(array.length - 1 - index, true)
                          }}
                          decrementAction={() => {
                            handleQuantityChange(array.length - 1 - index, false)
                          }}
                          decrementDisable={
                            billCurrentCommand.products[array.length - 1 - index].quantity <= 1 ||
                            element.active
                          }
                          incrementDisable={
                            billCurrentCommand.products[array.length - 1 - index].quantity >= 99 ||
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
                            return
                          }
                          addModifier.openModal()
                          setSelectedProduct({ index: index, product: element })
                        }}
                      >
                        {element.productName}
                      </span>
                      <p>${formatToCurrency(calculateProductTotal(element))}</p>
                      {!element.active && (
                        <button onClick={() => deleteProduct(index)}>
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
                )
              })}
            </div>
            <div>
              <span>Cantidad:</span>
              <span>{selectQuantity ? selectQuantity : 1}</span>
            </div>
            <div className={styles.totalContainer}>
              <div>
                <span>Total: </span>
                <span>{`$${calculateBillTotal(billCurrentCommand.products)}`}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className={styles.headAccount}>
              <span>Cuenta: 0{type === ON_SITE_ORDER ? tableItem.tableNum : '#'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {billCurrentCommand?.products?.map((_, index, array) => {
                const element = array[array.length - 1 - index] // Accede al elemento desde el final
                return (
                  <div key={index} className={styles.pr}>
                    <div className={styles.productContainer}>
                      {!element.active ? (
                        <QuantityInterface
                          incrementAction={() => {
                            handleQuantityChange(array.length - 1 - index, true)
                          }}
                          decrementAction={() => {
                            handleQuantityChange(array.length - 1 - index, false)
                          }}
                          decrementDisable={
                            billCurrentCommand.products[array.length - 1 - index].quantity <= 1 ||
                            element.active
                          }
                          incrementDisable={
                            billCurrentCommand.products[array.length - 1 - index].quantity >= 99 ||
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
                            return
                          }
                          addModifier.openModal()
                          console.log({ index: index, product: element })
                          setSelectedProduct({ index: index, product: element })
                        }}
                      >
                        {element.productName}
                      </span>
                      <p>${formatToCurrency(calculateProductTotal(element))}</p>
                      {!element.active && (
                        <button onClick={() => deleteProduct(index)}>
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
                )
              })}
            </div>
            <div>
              <span>Cantidad:</span>
              <span>{selectQuantity ? selectQuantity : 1}</span>
            </div>
            <div className={styles.totalContainer}>
              <div>
                <span>Total: </span>
                <span>${formatToCurrency(calculateBillTotal(billCurrentCommand.products))}</span>
              </div>
            </div>
          </div>
        </>
      )}
      <NumbersBar
        action={(element) => {
          setSelectQuantity(element)
        }}
        mainKeyboard={mainKeyboard}
      />
    </section>
  )
}
