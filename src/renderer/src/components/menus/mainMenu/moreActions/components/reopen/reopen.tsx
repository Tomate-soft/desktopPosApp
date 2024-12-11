import styles from './reopen.module.css'
import { Bill } from '@renderer/types/account'
import questionIcon from '@renderer/assets/icon/questionsIcon.svg'
import { UseActions } from '@renderer/store/moreActions/moreActions.store'

interface Props {
  children: any
  handleLoading: any
  currentBill: Bill
  openModal: any
  userId: string
}

export default function ReopenModal({
  onClose,
  children,
  handleLoading,
  currentBill,
  openModal,
  userId
}: Props) {
  const reopenBill = UseActions((state) => state.reopenBill)

  const handleClick = () => {
    const body = {
      accountId: currentBill?._id,
      userId: userId
    }
    console.log(body)

    reopenBill(body)
    openModal()
  }
  return (
    <main className={styles.container}>
      <div>
        <img src={questionIcon} alt="question-icon" />
        <h3>¿Reabrir cuenta?</h3>
        <div>
          <button onClick={handleClick}>Confirmar</button>
        </div>
      </div>
    </main>
  )
}
