import searchIcon from "@/assets/icon/searchIcon.svg";
import backtwo from "@/assets/icon/backTwo.svg";
import styles from "../../order.module.css";

interface Props {
  action: (element: number) => void;
  mainKeyboard: any;
}

export default function NumbersBar({ action, mainKeyboard }: Props) {
  return (
    <div>
      <button onClick={mainKeyboard.openModal}>
        <img src={searchIcon} alt="search-icon" />
      </button>
      <div className={styles.containerNumbersBar}>
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
  );
}
