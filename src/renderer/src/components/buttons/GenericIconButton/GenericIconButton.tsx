import styles from './GenericIconButton.module.css'

interface GenericIconButtonProps {
  children: React.ReactNode
  onClick?: () => void
  request?: () => void
  openModal?: () => void
  isLoading?: boolean
}

export default function GenericIconButton({
  children,
  onClick,
  request,
  isLoading
}: GenericIconButtonProps) {
  return (
    <button
      style={isLoading ? { background: 'transparent', cursor: 'wait' } : {}}
      className={styles.button}
      onClick={() => {
        if (request) request()
      }}
    >
      {children}
    </button>
  )
}
