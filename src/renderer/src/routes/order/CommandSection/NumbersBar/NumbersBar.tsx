import searchIcon from '@renderer/assets/icon/searchIcon.svg'
import backtwo from '@renderer/assets/icon/backTwo.svg'
import styles from './NumberBar.module.css'
import { useState } from 'react'

interface Props {
  action: (element: number) => void
  mainKeyboard: any
}

export default function NumbersBar({ action, mainKeyboard }: Props) {
  const [quantity, setQuantity] = useState<number>(0) // quantity como número

  const handleButtonClick = (value: number) => {
    if (quantity < 10) {
      // Si solo tiene un dígito, concatenamos el valor
      setQuantity(quantity * 10 + value)
    } else if (quantity >= 10 && quantity < 100) {
      // Si ya tiene dos dígitos, reemplazamos el valor
      setQuantity(value)
    }
  }

  const handleBackClick = () => {
    // Cuando se presiona el botón de retroceso, reseteamos el valor a 1
    setQuantity(0)
  }

  return (
    <div className={styles.numbersBar}>
      <button onClick={mainKeyboard.openModal}>
        <img src={searchIcon} alt="search-icon" />
      </button>
      <div>
        {[...Array(9)].map((item, index) => (
          <button
            onClick={() => handleButtonClick(index + 1)} // Número del 1 al 9
            key={index}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handleButtonClick(0)}>{0}</button> {/* Botón 0 */}
      </div>
      {/* El último botón ahora resetea la cantidad a 1 */}
      <button onClick={handleBackClick}>
        <img src={backtwo} alt="backIcon" />
      </button>
      {/* Llamada a action con el valor de quantity cuando se actualiza */}
      {action && action(quantity)} {/* Directamente pasamos el número */}
    </div>
  )
}
