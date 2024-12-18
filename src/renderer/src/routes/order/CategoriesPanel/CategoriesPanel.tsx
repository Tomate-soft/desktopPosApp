import { categoriesMap } from '@renderer/mocks/categories'
import styles from './CategoriesPanel.module.css'

interface CategoriesPanelProps {
  productsArray: any
  setCommandArray: any
}

export default function CategoriesPanel({ productsArray, setCommandArray }: CategoriesPanelProps) {
  return (
    <section className={styles.sectionContainerCategories}>
      {categoriesMap?.map((itemI, index) => (
        <section
          key={index}
          className={styles.containerCategories}
          onClick={() => {
            const productsFiltered = productsArray.filter((item) => item.subcategory === itemI)
            setCommandArray(productsFiltered)
          }}
        >
          <p>{itemI}</p>
        </section>
      ))}
    </section>
  )
}
