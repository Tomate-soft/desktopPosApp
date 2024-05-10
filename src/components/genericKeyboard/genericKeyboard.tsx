import { useEffect, useState } from "react";
import styles from "./genericKeyboard.module.css";
import backspace from "../../assets/icon/backspaceIcon.svg";
import cleanIcon from "../../assets/icon/cleanIcon.svg";
import spaceIcon from "../../assets/icon/spaceIcon.svg";
import leftArrow from "../../assets/icon/backArrow.svg";
import disquetIcon from "../../assets/icon/disquetIcon.svg";

interface Props {
  children: string;
  actionType?: any;
  openModal: any;
  setValue?: any;
  isOpen: boolean;
  onClose: () => void;
}
export function GenericKeyboard({
  children,
  actionType,
  openModal,
  onClose,
  setValue,
  isOpen,
}: Props) {
  const [mayus, setMayus] = useState(true);
  const [text, setText] = useState("");

  const rowOne = ["", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const rowTwo = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´", "/"];
  const rowThree = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "-"];
  const rowFour = ["Z", "X", "C", "V", "B", "N", "M", ",", "."];

  return (
    <main className={styles.screen}>
      <article className={styles.container}>
        <div className={styles.noteNav}>
          <strong>{children}</strong>
        </div>
        <input readOnly type="search" value={text} />
        <div className={styles.keys}>
          <div className={styles.rowOne}>
            {rowOne.map((element, index) => (
              <button
                className={styles.key}
                key={index}
                onClick={() => {
                  const newText = text.concat(element);
                  setText(newText);
                }}
              >
                {element}
              </button>
            ))}
            <button
              className={styles.backspace}
              onClick={() => {
                const newText = text.slice(0, -1);
                setText(newText);
              }}
            >
              <img src={backspace} alt="clean-button" />
            </button>
          </div>
          <div className={styles.rowTwo}>
            {rowTwo.map((element, index) => (
              <button
                className={styles.key}
                key={index}
                onClick={() => {
                  const newText = text.concat(
                    mayus ? element : element.toLowerCase()
                  );
                  setText(newText);
                  if (text.length >= 0 && text.length < 1 && mayus) {
                    setMayus(!mayus);
                  }
                }}
              >
                {mayus ? element : element.toLowerCase()}
              </button>
            ))}
          </div>
          <div className={styles.rowThree}>
            {rowThree.map((element, index) => (
              <button
                className={styles.key}
                key={index}
                onClick={() => {
                  const newText = text.concat(
                    mayus ? element : element.toLowerCase()
                  );
                  setText(newText);
                  if (text.length >= 0 && text.length < 1 && mayus) {
                    setMayus(!mayus);
                  }
                }}
              >
                {mayus ? element : element.toLowerCase()}
              </button>
            ))}
          </div>
          <div className={styles.rowFour}>
            <button
              className={styles.mayus}
              onClick={() => {
                setMayus(!mayus);
              }}
            >
              Bloq mayus
            </button>
            {rowFour.map((element, index) => (
              <button
                className={styles.key}
                key={index}
                onClick={() => {
                  const newText = text.concat(
                    mayus ? element : element.toLowerCase()
                  );
                  setText(newText);
                  if (text.length >= 0 && text.length < 1 && mayus) {
                    setMayus(!mayus);
                  }
                }}
              >
                {mayus ? element : element.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.spaceButtons}>
          <button
            className={styles.cleanBtn}
            onClick={() => {
              setText("");
            }}
          >
            <img src={cleanIcon} alt="clean-icon" />
          </button>
          <button
            className={styles.spaceBtn}
            onClick={() => {
              const newText = text.concat(" ");
              setText(newText);
            }}
          >
            <img src={spaceIcon} alt="space-icon" />
          </button>
          <button className={styles.checkBtn}>
            <img
              className={styles.disquet}
              src={disquetIcon}
              alt="check-icon"
            />
          </button>
        </div>
        <div className={styles.addButtonsContainer}>
          <button onClick={onClose}>
            <img src={leftArrow} alt="left-arrow" />
            Regresar
          </button>
        </div>
      </article>
    </main>
  );
}
