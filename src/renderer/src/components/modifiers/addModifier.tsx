import styles from './addModifier.module.css'
import addCircle from '../../assets/icon/addCircle.svg'
import saveIcon from '../../assets/icon/disquetIcon.svg'
import cleanIcon from '../../assets/icon/cleanBtn.svg'
import dividerOne from '../../assets/icon/divider01000.svg'
import dividerTwo from '../../assets/icon/divider02000.svg'
import crossBtn from '../../assets/icon/crossButton.svg'
import { useEffect, useState } from 'react'
import { staticModifiers } from '../../lib/modifiers.lib'
import CloseButton from '../buttons/CloseButton/closeButton'
interface Props {
  isOpen: any
  onClose: any
  children: any
  product: any
  action: (args: any) => void
  indexP: number
}

export default function AddModifier({ isOpen, onClose, children, product, action, indexP }: Props) {
  const [dishes, setDishes] = useState<any[]>([])
  const [modifiers, setModifiers] = useState<any[]>([])
  const [selectedModifier, setSelectedModifier] = useState()

  useEffect(() => {
    setSelectedModifier(staticModifiers[0])
  }, [])

  return (
    <main className={styles.screen}>
      <div>
        {product.product.group ? (
          <>
            <div>
              <div>
                <img src={addCircle} alt="tittle-icon" />
                <h3>Complementos y modificadores</h3>
              </div>
              <CloseButton onClose={onClose} />
            </div>
            <div>
              <h3>{product.product.productName}</h3>
              <div>
                <section>
                  {dishes?.map((element, index) => (
                    <div>
                      <h3>{element?.dishesName}</h3>
                      <button
                        onClick={() => {
                          const filterDishes = dishes.filter((_, i) => i !== index)
                          setDishes(filterDishes)
                        }}
                      >
                        <img src={crossBtn} alt="cross-button" />
                      </button>
                    </div>
                  ))}
                </section>
                <section>
                  {modifiers?.map((element, index) => (
                    <div>
                      <h3>{element.modifierName}</h3>
                      <button
                        onClick={() => {
                          const filterModifiers = modifiers.filter((_, i) => i !== index)
                          setModifiers(filterModifiers)
                        }}
                      >
                        <img src={crossBtn} alt="cross-button" />
                      </button>
                    </div>
                  ))}
                </section>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <h3>Complementos</h3>
                  <img src={dividerOne} alt="divider-icon" />
                </div>
                <div>
                  {product.product.group?.dishes?.map((element, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const settingDishes = !dishes.length ? [element] : [...dishes, element]
                        setDishes(settingDishes)
                      }}
                    >
                      {element?.dishesName}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <h3>Modificadores</h3>
                  <img src={dividerTwo} alt="divider-two" />
                </div>
                <div>
                  <div>
                    {staticModifiers.map((element) => (
                      <button
                        style={
                          selectedModifier?.tittle === element.tittle
                            ? {
                                background: 'white',
                                color: 'black',
                                fontWeight: '400'
                              }
                            : {}
                        }
                        onClick={() => {
                          setSelectedModifier(element)
                        }}
                        key={element.tittle}
                      >
                        {element.tittle}
                      </button>
                    ))}
                  </div>
                  <div>
                    {product.product.group?.modifiers?.map((element, index) => {
                      const isSelected = element.verbs.includes(selectedModifier?.value)
                      return isSelected ? (
                        <button
                          key={index}
                          onClick={() => {
                            const settingModifiers = !modifiers.length
                              ? [{ ...element, modifierName: `${selectedModifier?.tittle } ${element.modifierName}` }]
                              : [
                                  ...modifiers,
                                  {
                                    ...element,
                                    modifierName: `${selectedModifier?.tittle } ${element.modifierName}`
                                  }
                                ]

                            setModifiers(settingModifiers)
                          }}
                        >
                          {element.modifierName}
                        </button>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setDishes([])
                  setModifiers([])
                }}
              >
                <img src={cleanIcon} alt="clean-icon" />
                Borrar todo
              </button>
              <button
                className={styles.saveBtn}
                onClick={() => {
                  action({
                    product: {
                      ...product.product,
                      dishes: dishes,
                      modifiers: modifiers
                    },
                    index: product.index
                  })
                  onClose()
                }}
              >
                <img src={saveIcon} alt="save-icon" />
                Guardar
              </button>
            </div>
          </>
        ) : (
          <>
            <CloseButton onClose={onClose} />
            <h1
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Asigna un grupo de modificadores para este producto desde el administrador
            </h1>
          </>
        )}
      </div>
    </main>
  )
}
