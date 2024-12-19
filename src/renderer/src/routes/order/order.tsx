// styles //
import '../../styles/global/global.css'
import styles from './order.module.css'

// Icons
import HeaderTwo from '../../components/headers/headerTwo/headerTwo'
import { v4 as uuidv4 } from 'uuid'

// Hooks
import useProducts from '../../hooks/useProducts'
import { useEffect, useState } from 'react'

// Types and interfaces
import { Product } from '../../types/products'

//Hooks
import UseAccount from '../../hooks/useAccount'
import { useLocation } from 'react-router-dom'
import UseOrder from '../../hooks/useOrder'
import UseTable from '../../hooks/useTable'
import { useCurrentCommand } from '../../store/productsInOrder.store'
import { categoriesMap } from '../../mocks/categories'
import { useModal } from '../../hooks/useModal'
import MainKeyboard from '../../components/tools/mainKeyboard/mainKeyboard'
import { useAuthStore } from '../../store/auth/auth.store'
import { ON_SITE_ORDER, PHONE_ORDER, RAPPI_ORDER, TO_GO_ORDER } from '../../lib/orders.lib'
import { useToGoOrders } from '../../store/orders/togoOrder.store'
import AddModifier from '../../components/modifiers/addModifier'
import { ADD_MODIFIER_MODAL, CONFIRM_CHANGES, MAIN_KEYBOARD } from '../../lib/modals.lib'

import { useNotesStore } from '../../store/notes.store'
import ConfirmChanges from '../../components/modals/confirm/confirmChanges'
import { ENABLE_STATUS, FOR_PAYMENT_STATUS } from '../../lib/tables.status.lib'
import { useCashierSessionStore } from '../../store/operatingPeriod/cashierSession.store'
import UseVerify from '../../hooks/verifications/useVerify'
import { useRappiOrders } from '@renderer/store/orders/rappiOrders.store'
import { usePhoneOrders } from '@renderer/store/orders/phoneOrder.store'
import CategoriesPanel from './CategoriesPanel/CategoriesPanel'
import OrderFooter from './ordersFooter/OrderFooter'
import CommandSection from './CommandSection/CommandSection'
import { calculateBillTotal } from '@renderer/utils/calculateTotals'

interface ToGoOrder {
  code: string /* esto despues sera automatico, agregar un unique*/
  user: string
  userId: string
  checkTotal: string
  status: 'enable' | 'free' | 'forPayment' | 'pending'
  products: []
  payment: []
  orderName?: string
  operatingPeriod: string
}

export default function Order() {
  const confirmChanges = useModal(CONFIRM_CHANGES)
  const isLoadingNote = useNotesStore((state) => state.isLoading)
  const errorsNote = useNotesStore((state) => state.errors)
  const updateNote = useNotesStore((state) => state.updateNote)
  const updatePropInNote = useNotesStore((state) => state.updateNoteProp)

  const [selectNote, setSelectNote] = useState([])
  const [toggleStatus, setToggleStatus] = useState(false)
  const [selectQuantity, setSelectQuantity] = useState<number | null>(null)

  // MODALS
  const addModifier = useModal(ADD_MODIFIER_MODAL)
  const authData = useAuthStore((state) => state.authData)
  const logOutRequest = useAuthStore((state) => state.logOutRequest)
  const createToGoOrder = useToGoOrders((state) => state.createNewOrder)
  const createRappiOrder = useRappiOrders((state) => state.createNewOrder)
  const updateToGoOrder = useToGoOrders((state) => state.updateOrder)
  const updateRappiOrder = useRappiOrders((state) => state.updateOrder)
  const createPhoneOrder = usePhoneOrders((state) => state.createNewOrder)
  const updatePhoneOrder = usePhoneOrders((state) => state.updateOrder)
  const addBillForPayment = useCashierSessionStore((state) => state.addBillForPayment)

  //add modifier
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [commandArray, setCommandArray] = useState<Product[]>()
  const { productsArray, getProducts } = useProducts()
  const { createAccount, handlePrint: handlePrintBill } = UseAccount()
  const { addBill, updateBill } = UseAccount()
  const { handlePrint } = UseOrder()
  const { updateTable } = UseTable()
  const location = useLocation()
  const { _id, billCurrent, tableItem, type, toGoOrder, orderName } = location.state || {}
  const { currentPeriod } = UseVerify()
  const managementNotes = tableItem?.bill[0]?.notes?.filter(
    (element: any) => element.status === ENABLE_STATUS
  )

  const userName = authData?.payload?.user?.name
  const initialOrderTogo: ToGoOrder = {
    code: '1016',
    user: userName,
    userId: authData?.payload?.user?._id,
    checkTotal: '0.00',
    status: 'enable',
    products: [],
    payment: [],
    orderName: orderName,
    operatingPeriod: currentPeriod[0]?._id
  }

  const isWithNotes = tableItem?.bill[0]?.notes?.length > 0
  const mainKeyboard = useModal(MAIN_KEYBOARD)

  // ZUSTAND /////////////////
  const billCurrentCommand = useCurrentCommand((state) => state.BillCommandCurrent)
  const setBillCurrentCommand = useCurrentCommand((state) => state.setState)

  const handleAddedProducts = (item: Product) => {
    const itemWithUnique = { ...item, unique: uuidv4() }

    setBillCurrentCommand({
      ...billCurrentCommand,
      products: [...billCurrentCommand.products, itemWithUnique]
    })
  }

  const handleQuantityChange = (index: number, increment: boolean) => {
    const updatedProducts = [...billCurrentCommand.products]
    const currentQuantity = updatedProducts[index].quantity
    let newQuantity
    if (increment) {
      newQuantity = currentQuantity >= 99 ? 99 : currentQuantity + 1
    } else {
      newQuantity = currentQuantity <= 1 ? 1 : currentQuantity - 1
    }
    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity: newQuantity
    }

    setBillCurrentCommand({
      ...billCurrentCommand,
      products: [
        ...billCurrentCommand.products.slice(0, index),
        updatedProducts[index],
        ...billCurrentCommand.products.slice(index + 1)
      ]
    })
  }

  const sellTypeHead =
    billCurrentCommand.sellType === ON_SITE_ORDER
      ? 'Restaurante'
      : billCurrentCommand.sellType === RAPPI_ORDER
        ? 'Rappi'
        : null

  useEffect(() => {
    getProducts()
    const filteredProducts = productsArray.filter((item) => item?.category === categoriesMap[0])
    setCommandArray(filteredProducts)
    if (type === ON_SITE_ORDER) {
      // Acceder de manera segura a las propiedades de tableItem y bill
      if (tableItem?.bill?.[0]?.notes && tableItem.bill[0].notes.length > 0) {
        const managementNotes = tableItem.bill[0].notes.filter(
          (element) => element.status === ENABLE_STATUS
        )
        setSelectNote(managementNotes[0]) // Asignar la primera nota como selectNote
        setBillCurrentCommand(managementNotes[0]) // Asignar la primera nota como billCurrentCommand
        return
      }

      // Si hay un bill[0], asignarlo como billCurrentCommand
      if (tableItem.bill[0]) {
        setBillCurrentCommand(tableItem.bill[0])
        return
      }

      setBillCurrentCommand({
        ...billCurrentCommand,
        table: tableItem._id,
        user: authData?.payload?.user?._id
      })
    }

    if (type === TO_GO_ORDER || type === RAPPI_ORDER || type === PHONE_ORDER) {
      // Configurar billCurrentCommand basado en toGoOrder o initialOrderTogo si toGoOrder no está definido
      if (toGoOrder) {
        setBillCurrentCommand(toGoOrder)
        return
      } else {
        setBillCurrentCommand(initialOrderTogo)
      }
    }

    // Función de limpieza del efecto
    return () => {
      setBillCurrentCommand({
        ...billCurrentCommand,
        products: []
      })
    }
  }, [])

  /////////////////////////////////////////////////////////////////////
  ///////////////////ORDERS PROPS/////////////////////////////////////
  /////////////////////////////////////////////////////////////////////

  const notesAllow = tableItem?.bill[0] && tableItem.bill[0]?.notes?.length

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////
  ///////////////////FOOTER PROPS///////////////////////////
  /////////////////////////////////////////////////////////////////////

  ////////////////////////////

  const handlePrintForFooter = async () => {
    if (isWithNotes) {
      const body = {
        accountId: tableItem.bill[0]?._id,
        body: { status: FOR_PAYMENT_STATUS }
      }
      updatePropInNote(selectNote._id, body)
      logOutRequest()
      return
    }
    // {
    handlePrintBill('billPrint', billCurrentCommand),
      //  }
      updateBill(FOR_PAYMENT_STATUS, billCurrent, billCurrentCommand)
    updateTable(FOR_PAYMENT_STATUS, _id)
    // vamos a mandar el indice 0 desde el periodo operativo actual
    const elasticBalnceChargeBills =
      currentPeriod[0]?.sellProcess?.length < 2
        ? currentPeriod[0]?.sellProcess[0]._id
        : currentPeriod[0]?.sellProcess[0]?.bills?.length >
            currentPeriod[0]?.sellProcess[1]?.bills?.length
          ? currentPeriod[0]?.sellProcess[1]._id
          : currentPeriod[0]?.sellProcess[0]._id
    await addBillForPayment(elasticBalnceChargeBills, billCurrent._id)
    logOutRequest()
  }

  const sendAction = async () => {
    if (type === ON_SITE_ORDER) {
      if (isWithNotes) {
        const dataTransfer = {
          body: {
            products: billCurrentCommand.products,
            checkTotal: calculateBillTotal(billCurrentCommand.products)
          },
          accountId: tableItem.bill[0]?._id
        }
        updateNote(selectNote._id, dataTransfer)
        confirmChanges.openModal()
        return
      }
      try {
        if (!billCurrent) {
          const newBill = await createAccount(billCurrentCommand)
          updateTable(ENABLE_STATUS, _id)
          handlePrint(billCurrentCommand)
          addBill(newBill._id, _id)
          logOutRequest()
          return
        }
        // updateBill(ENABLE_STATUS, billCurrent, billCurrentCommand);
        handlePrint(billCurrentCommand)
        logOutRequest()
      } catch (error) {
        console.error('Error:', error)
      }
    }
    if (type === TO_GO_ORDER) {
      if (toGoOrder) {
        updateToGoOrder(toGoOrder._id, billCurrentCommand)
        logOutRequest()
        return
      }
      createToGoOrder(billCurrentCommand)
      logOutRequest()
    }
    if (type === RAPPI_ORDER) {
      if (toGoOrder) {
        updateRappiOrder(toGoOrder._id, billCurrentCommand)
        logOutRequest()
        return
      }
      createRappiOrder(billCurrentCommand)
      logOutRequest()
    }
    if (type === PHONE_ORDER) {
      if (toGoOrder) {
        updatePhoneOrder(toGoOrder._id, billCurrentCommand)
        logOutRequest()
        return
      }
      createPhoneOrder(billCurrentCommand)
      logOutRequest()
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // ver si hay notas
  // todo para HOY
  function addExtrasInProduct(product: any) {
    const currentData = { ...billCurrentCommand }
    currentData.products[product.index] = product.product
    setBillCurrentCommand(currentData)
  }

  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  return (
    <div className={styles.container}>
      <HeaderTwo sellType={sellTypeHead} />
      <main className={styles.mainSection}>
        <CommandSection
          notesAllow={notesAllow}
          type={type}
          tableItem={tableItem}
          setToggleStatus={() => {
            setToggleStatus(!toggleStatus)
          }}
          toggleStatus={toggleStatus}
          selectNote={selectNote}
          managementNotes={managementNotes}
          settingNotes={(element) => {
            setSelectNote(element)
            setBillCurrentCommand(element)
          }}
          billCurrentCommand={billCurrentCommand}
          handleQuantityChange={handleQuantityChange}
          addModifier={addModifier}
          setSelectedProduct={setSelectedProduct}
          mainKeyboard={mainKeyboard}
          selectQuantity={selectQuantity}
          setSelectQuantity={setSelectQuantity}
        />

        <div>
          <section className={styles.sectionContainerProducts}>
            {productsArray &&
              commandArray?.map((item, index) => (
                <button
                  disabled={item.status === 'disabled'}
                  key={index}
                  className={styles.containerProduct}
                  onClick={() => {
                    handleAddedProducts(item)
                  }}
                >
                  <p>{item.productName}</p>
                </button>
              ))}
          </section>
          <CategoriesPanel productsArray={productsArray} setCommandArray={setCommandArray} />
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
          actionType={logOutRequest}
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
          loading={isLoadingNote}
          errors={errorsNote}
        >
          {''}
        </ConfirmChanges>
      ) : null}
      <OrderFooter
        handlePrint={handlePrintForFooter}
        billCurrent={billCurrent}
        sendAction={sendAction}
        sendDisabled={billCurrentCommand?.products.length < 1}
      />
      {addModifier.isOpen && addModifier.modalName === ADD_MODIFIER_MODAL ? (
        <AddModifier
          isOpen={addModifier.isOpen}
          onClose={addModifier.closeModal}
          product={selectedProduct}
          action={addExtrasInProduct}
        >
          ""
        </AddModifier>
      ) : null}
    </div>
  )
}
