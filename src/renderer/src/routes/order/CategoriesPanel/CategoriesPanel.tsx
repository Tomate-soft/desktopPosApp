import { categoriesMap } from '@renderer/mocks/categories'
import styles from './CategoriesPanel.module.css'
import { useEffect } from 'react'
import { useSubcategoriesStore } from '@renderer/store/subcategories.store'

interface CategoriesPanelProps {
  productsArray: any
  setCommandArray: any
}

export default function CategoriesPanel({ productsArray, setCommandArray }: CategoriesPanelProps) {
  const getSubcategories = useSubcategoriesStore((state) => state.getSubcategories)
  const subCategoriesArray = useSubcategoriesStore((state) => state.subCategoriesArray)

  useEffect(() => {
    getSubcategories()
    console.log(subCategoriesArray)
  }, [])
  return (
    <section className={styles.sectionContainerCategories}>
      {subCategoriesArray?.map((itemI, index) => (
        <section
          key={index}
          className={styles.containerCategories}
          onClick={() => {
            const productsFiltered = productsArray.filter((item) => item.subcategory === itemI.name)
            setCommandArray(productsFiltered)
          }}
        >
          <p>{itemI.name}</p>
        </section>
      ))}
    </section>
  )
}
