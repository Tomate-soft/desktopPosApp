import styles from './restaurant.module.css'
import { useAuthStore } from '../../store/auth/auth.store'
import { useNavigate } from 'react-router-dom'
import { SELL_TYPES_PATH } from '../../lib/routes.paths.lib'
import homeIcon from '../../assets/icon/homeIcon.svg'
import logOutIcon from '../../assets/icon/logOutIcon.svg'
import pendingIcon from '../../assets/icon/pending.svg'
import enableIcon from '../../assets/icon/enableIcon.svg'
import paymentIcon from '../../assets/icon/paymentIcon.svg'
import freeIcon from '../../assets/icon/freeIcon.svg'

export default function RestaurantFooter() {
  const logOutRequest = useAuthStore((state) => state.logOutRequest)
  const navigate = useNavigate()
  return (
    <footer className={styles.footer}>
      <div>
        <button
          onClick={() => {
            logOutRequest()
          }}
        >
          <img src={logOutIcon} alt="back-icon" />
          Salir
        </button>
        <button
          onClick={() => {
            navigate(`/${SELL_TYPES_PATH}`)
          }}
        >
          <img src={homeIcon} alt="home-icon" />
          Inicio
        </button>
      </div>
      <div>
        <span>
          <img src={pendingIcon} alt="pending-icon" />
          En espera
        </span>
        <span>
          <img src={enableIcon} alt="enable-icon" />
          Activa
        </span>
        <span>
          <img src={paymentIcon} alt="payment-icon" />
          Por pagar
        </span>
        <span>
          <img src={freeIcon} alt="free-icon" />
          Libre
        </span>
      </div>
    </footer>
  )
}
