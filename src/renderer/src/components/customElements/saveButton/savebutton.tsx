import styles from './saveButton.module.css'
import disquetIcon from '@renderer/assets/icon/disquetIcon.svg'
import arrow from '@renderer/assets/icon/selectArrow.svg'

enum Modes {
  SAVE = 'SAVE_MODE', // default
  SEND = 'SEND_MODE'
}

interface Props {
  mode?: Modes
  action: () => void
  text?: string
  isDisable?: boolean
}

export default function RequestButton({ mode, action, text, isDisable }: Props) {
  return (
    <button disabled={isDisable} className={styles.requestButton} onClick={action}>
      {mode === Modes.SEND ? (
        <>
          <span>{text ?? 'Enviar'}</span>
          <img src={arrow} alt="save-icon" />
        </>
      ) : (
        <>
          <span>{text ?? 'Guardar'}</span>
          <img src={disquetIcon} alt="save-icon" />
        </>
      )}
    </button>
  )
}
