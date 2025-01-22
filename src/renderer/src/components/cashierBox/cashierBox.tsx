import styles from './cashierBox.module.css'
// Hooks
import tableFree from '../../assets/icon/tableForPayment.svg'
import { CashierBoxProps } from '../../types/props/cashierBoxProps'
import { useEffect } from 'react'
import personIcon from '../../assets/icon/personIcon.svg'
import useTimeAgo from '@renderer/hooks/useTimeAgo'
// types
export default function CashierBox({ openModal, item, setting, isNote }: CashierBoxProps) {
  const times = !isNote?.noteNumber
    ? new Date(item?.updatedAt.toString())
    : new Date(isNote?.updatedAt.toString())
  const timing = useTimeAgo(times, 'es')
  const handleclick = () => {
    openModal()
    const itemWithNote = isNote ? { bill: item, note: isNote } : { bill: item }
    const itemDataSet = isNote ? itemWithNote : item
    setting(itemDataSet)
  }
  useEffect(() => {
    console.log(`aca la nota}`, item?.updatedAt.toString())
  }, [item])
  return (
    <div className={styles.table} onClick={handleclick}>
      <div>
        <span>{timing}</span>
        <div>
          <span>{item?.diners}</span>
          <img src={personIcon} alt="person-icon" />
        </div>
      </div>
      <img src={tableFree} alt="table-free" />
      <p>{item.tableNum}</p>
      <span>{item.user}</span>
      <div>
        <span>
          {item?.code} {isNote?.noteNumber ? `· Nota: ${isNote.noteNumber}` : ''}
        </span>
      </div>
    </div>
  )
}
