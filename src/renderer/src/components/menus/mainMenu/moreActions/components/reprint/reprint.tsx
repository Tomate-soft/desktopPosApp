import { Bill } from '@renderer/types/account'
import styles from './reprint.module.css'
import questionIcon from '@renderer/assets/icon/questionsIcon.svg'
import UseImpression from '@renderer/hooks/useImpressions'

interface Props {
  children: any
  handleLoading: any
  currentBill: Bill
  openModal: any
}

export default function ReprintModal({ children, openModal, currentBill, handleLoading }: Props) {

  const { printRestaurantOrderTicket } = UseImpression()
  return (
    <main className={styles.container}>
      <div>
        <img src={questionIcon} alt="question-icon"></img>
        <h3>¿Reimprimir cuenta?</h3>
        <div>
          <button onClick={() => printRestaurantOrderTicket(currentBill)}>Aceptar</button>
        </div>
      </div>
    </main>
  )
}
