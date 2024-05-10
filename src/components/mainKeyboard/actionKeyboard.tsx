import { useEffect, useState } from "react";
import styles from "./actionKeyboard.module.css";
import backspace from "../../assets/icon/backspaceIcon.svg";
import cleanIcon from "../../assets/icon/cleanIcon.svg";
import spaceIcon from "../../assets/icon/spaceIcon.svg";
import minCheck from "../../assets/icon/minCheck.svg";
import nextArrow from "../../assets/icon/nextArrow.svg";
import previousArrow from "../../assets/icon/previousArrow.svg";
import disquetIcon from "../../assets/icon/disquetIcon.svg";
import {
  BILL_NAME,
  COMMENTS,
  NOTES_NAME,
} from "../menus/mainMenu/moreActions/configs/constants";
interface Props {
  children: string;
  actionType: any;
  item: any;
  openModal: any;
  option: string;
}
export function ActionsKeyboard({
  children,
  actionType,
  item,
  openModal,
  option,
}: Props) {
  const [mayus, setMayus] = useState(true);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [indexNote, setIndexNote] = useState(0);

  const rowOne = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const rowTwo = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´", "/"];
  const rowThree = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "-"];
  const rowFour = ["Z", "X", "C", "V", "B", "N", "M", ",", "."];

  const selectedNote = notes[indexNote];

  useEffect(() => {
    if (item.bill[0] && item.bill[0].notes && item.bill[0].notes.length) {
      setNotes(item.bill[0].notes);
    }
  }, [item]);

  return (
    <article className={styles.container}>
      <div className={styles.noteNav}>
        <strong>{children}</strong>
        {notes && notes.length && option === NOTES_NAME ? (
          <div className={styles.selectNotesInterface}>
            <span>
              Nota{" "}
              {selectedNote.noteName
                ? selectedNote.noteName
                : selectedNote.noteNumber}
            </span>
            <div>
              <button
                disabled={indexNote <= 0}
                onClick={() => {
                  console.log(notes);
                  setIndexNote(indexNote - 1);
                }}
              >
                <img src={previousArrow} alt="arrow-left" />
              </button>
              <button
                disabled={indexNote >= notes.length - 1}
                onClick={() => {
                  console.log(indexNote);
                  setIndexNote(indexNote + 1);
                }}
              >
                <img src={nextArrow} alt="arrow-rigth" />
              </button>
            </div>
          </div>
        ) : option === BILL_NAME || option === COMMENTS ? (
          <div>
            <span>
              {item.bill[0] && item.bill[0]?.billName?.length > 1
                ? item.bill[0]?.billName
                : item.bill[0]?.billCode}
            </span>
          </div>
        ) : null}
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
        {option === BILL_NAME ? (
          <button
            className={styles.checkBtn}
            disabled={!item?.bill[0]}
            onClick={() => {
              if (text.length > 1) {
                actionType(item.bill[0]?._id, text);
              }
              openModal();
              return;
            }}
          >
            <img src={minCheck} alt="check-icon" />
          </button>
        ) : (
          <button
            className={styles.checkBtn}
            disabled={!item?.bill[0] || text.length > 14 || text.length <= 0}
            onClick={() => {
              if (text.length > 1) {
                actionType(selectedNote._id, text);
              }
              openModal();
              return;
            }}
          >
            <img
              className={styles.disquet}
              src={disquetIcon}
              alt="check-icon"
            />
          </button>
        )}
      </div>
    </article>
  );
}
