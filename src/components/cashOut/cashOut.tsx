import styles from "./cashOut.module.css";
import tillIcon from "../../assets/icon/cashOutCircle.svg";
import crossButton from "../../assets/icon/crossButton.svg";
import backSpace from "../../assets/icon/backspaceIcon.svg";
import minCheck from "../../assets/icon/minCheck.svg";

import { useState } from "react";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function CashOut({ isOpen, onClose, children }: Props) {
  const [value, setValue] = useState("");
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "00"];

  return (
    <main className={styles.screen}>
      <div className={styles.container}>
        <div>
          <div>
            <img src={tillIcon} alt="till-icon" />
            <h3>Retiro parcial</h3>
          </div>
          <button onClick={onClose}>
            <img src={crossButton} alt="close-button" />
          </button>
        </div>
        <div>
          <div>
            <strong>{value.length === 0 ? "$0" : `$${value}`}</strong>
          </div>
          <div>
            <div className={styles.mapKeys}>
              {keys.map((element, index) => (
                <button
                  onClick={() => {
                    if (value.length >= 6) {
                      return;
                    }
                    setValue((prevValue) => {
                      return prevValue.concat(element);
                    });
                  }}
                  className={styles.key}
                  key={index}
                >
                  {element}
                </button>
              ))}
            </div>
            <div className={styles.rightButtons}>
              <button
                onClick={() => {
                  setValue("");
                }}
              >
                <img src={backSpace} alt="backspace" />
              </button>
              <button>
                <img src={minCheck} alt="check" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
