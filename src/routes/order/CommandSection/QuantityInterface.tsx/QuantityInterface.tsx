import rest from "@/assets/icon/rest.svg";
import sum from "@/assets/icon/sum.svg";
import styles from "./QuantityInterface.module.css";

interface Props {
  incrementAction: () => void;
  decrementAction: () => void;
  decrementDisable: boolean;
  incrementDisable: boolean;
  element: any;
}

export default function QuantityInterface({
  incrementAction,
  decrementAction,
  incrementDisable,
  decrementDisable,
  element,
}: Props) {
  return (
    <div className={styles.container}>
      <button onClick={decrementAction} disabled={decrementDisable}>
        <img src={rest} alt="resta-icon" />
      </button>
      <span>{element.quantity}</span>
      <button onClick={incrementAction} disabled={incrementDisable}>
        <img src={sum} alt="sumar-icon" />
      </button>
    </div>
  );
}
