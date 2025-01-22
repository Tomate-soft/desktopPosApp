import styles from './addTips.module.css'
import cashIcon from '../../assets/icon/cashCircle.svg'
import minCheck from '@renderer/assets/icon/minCheck.svg'
import backbtn from '@renderer/assets/icon/backTwo.svg'
import { useEffect } from 'react'
import CloseButton from '../buttons/CloseButton/closeButton'
import { parse } from 'path'
import { calculateBillTotal } from '@renderer/utils/calculateTotals'

interface Props {
  isOpen: any
  onClose: any
  children: any
  actionType?: any
  value?: string
  setvalue?: (value: string) => void
  openModal?: any
  closeModal?: any
  transaction?: any
  products?: any
}

export default function AddTips({
  isOpen,
  onClose,
  children,
  actionType,
  value = '',
  setvalue,
  openModal,
  closeModal,
  transaction,
  products
}: Props) {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '00']

  useEffect(() => {
    console.log('transaction', transaction)
    return () => {
      setvalue('0')
    }
  }, [isOpen])

  const handleKeyPress = (key: string) => {
    if (value.length >= 6) return // Evitar que exceda el maxLength

    // Evitar múltiples puntos decimales
    if (key === '.' && value.includes('.')) return

    setvalue(value + key)
  }

  const handleBackspace = () => {
    setvalue(value.slice(0, -1))
  }

  const handleConfirm = () => {
    console.log(transaction)
    actionType({ ...transaction, tips: value })
    setvalue('') // Limpiar el valor después de confirmar
    onClose()
  }

  return (
    <main className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div>
            <img src={cashIcon} alt="head-icon" />
            <span>Agregar propina</span>
          </div>
          <CloseButton onClose={onClose} />
        </div>
        <div className={styles.board}>
          <div className={styles.input}>
            <input type="text" maxLength={6} value={value} readOnly />
            <span>$</span>
          </div>
          <div className={styles.pinboard}>
            <div className={styles.keys}>
              {keys.map((key) => (
                <button key={key} className={styles.key} onClick={() => handleKeyPress(key)}>
                  {key}
                </button>
              ))}
            </div>
            <div>
              <button className={styles.backButton} onClick={handleBackspace}>
                <img src={backbtn} alt="back-icon" />
              </button>
              <button className={styles.percentButton}>%</button>
              <button
                className={styles.checkButton}
                onClick={handleConfirm}
                disabled={parseFloat(value) > calculateBillTotal(products)}
              >
                <img src={minCheck} alt="check-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
