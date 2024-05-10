import { useState } from "react";
import styles from "./discount.module.css";
import backspace from "../../assets/icon/backspaceIcon.svg";
import { SET_PERCENT, SET_QUANTITY } from "./constants";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function DiscountBoard({ item, openModal }: Props) {
  const [percent, setPercent] = useState("");
  const [mode, setMode] = useState<string>(SET_PERCENT);

  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={mode === SET_PERCENT ? `${percent}%` : `$${percent}`}
      />
      <div>
        {mode === SET_QUANTITY ? (
          <>
            <div className={styles.keysContainer}>
              {keys.map((element, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (percent.length <= 5) {
                      setPercent((prevValue) => {
                        return prevValue.concat(element);
                      });
                    }
                  }}
                >
                  {element}
                </button>
              ))}
              <button>00</button>
            </div>
            <div>
              {mode === SET_QUANTITY ? (
                <>
                  <button>
                    <img
                      src={backspace}
                      alt="backspace"
                      onClick={() => {
                        setPercent("");
                      }}
                    />
                  </button>
                  <button
                    onClick={() => {
                      setMode(SET_PERCENT);
                      setPercent("");
                    }}
                  >
                    %
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.keysContainer}>
              {keys.map((element, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (percent.length <= 5) {
                      setPercent((prevValue) => {
                        return prevValue.concat(element);
                      });
                    }
                  }}
                >
                  {element}
                </button>
              ))}
              <button disabled={mode === SET_PERCENT}>00</button>
            </div>
            <div>
              {mode === SET_PERCENT ? (
                <>
                  <button>
                    <img
                      src={backspace}
                      alt="backspace"
                      onClick={() => {
                        setPercent("");
                      }}
                    />
                  </button>
                  <button
                    onClick={() => {
                      setMode(SET_QUANTITY);
                      setPercent("");
                    }}
                  >
                    $
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
