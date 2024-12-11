import searchIcon from '@renderer/assets/icon/searchIcon.svg'
import backtwo from '@renderer/assets/icon/backTwo.svg'
import styles from "./NumberBar.module.css"

interface Props {
  action: (element: number) => void
  mainKeyboard: any
}

export default function NumbersBar({ action, mainKeyboard }: Props) {
  return (
    <div className={styles.numbersBar}>
      <button onClick={mainKeyboard.openModal}>
        <img src={searchIcon} alt="search-icon" />
      </button>
      <div >
        {[...Array(10)].map((item, index) => (
          <button onClick={() => action(index + 1)} key={index}>
            {index + 1}
          </button>
        ))}
      </div>
      <button>
        <img src={backtwo} alt="backIcon" />
      </button>
    </div>
  )
}
