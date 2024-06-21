import styles from "./addTips.module.css";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function AddTips({ isOpen, onClose, children }: Props) {
  return (
    <main className={styles.screen}>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>Add tipd modal</h2>
      </div>
    </main>
  );
}
