import styles from './confirmChanges.module.css'

import checkIcon from '../../../assets/icon/checkIcon.svg'
import errorIcon from '../../../assets/icon/warning.svg'
import { useNavigate } from 'react-router-dom'
import Loader from '../../loader/loader'

interface Props {
  loading: boolean
  errors: any
  isOpen: boolean
  onClose: () => void
  children: string
  actionType?: () => void
  route?: string
  closeModal?: any
  conflict?: any
}

export default function ConfirmChanges({
  loading,
  errors,
  isOpen,
  onClose,
  children,
  actionType,
  route,
  closeModal,
  conflict
}: Props) {
  const navigate = useNavigate()

  if (!isOpen) return null
  if (!loading && !errors) {
    setTimeout(async () => {
      if (actionType) {
        actionType()
      }
      onClose()
      if (route) {
        navigate(route)
      }
      if (closeModal) {
        closeModal()
      }
    }, 1500)
  } else if (!loading && errors) {
    setTimeout(async () => {
      if (actionType) {
        actionType()
      }
      if (route) {
        navigate(route)
      }
      if (closeModal) {
        closeModal()
      }
      onClose()
    }, 1500)
  }
  return (
    <div className={styles.screen}>
      {loading ? (
        <Loader />
      ) : errors ? (
        <div className={styles.modal}>
          <img src={errorIcon} alt="check-icon" />
          <h1 className={styles.tittle}>No se pudo completar</h1>
        </div>
      ) : (
        <div className={styles.modal}>
          <img src={checkIcon} alt="check-icon" />
          <h1 className={styles.tittle}>{children}</h1>
        </div>
      )}
    </div>
  )
}
