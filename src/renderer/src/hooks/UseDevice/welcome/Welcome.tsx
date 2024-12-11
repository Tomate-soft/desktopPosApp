import styles from './welcome.module.css'
import tomateLogo from '@renderer/assets/icon/tomatePOSlogo.svg'
import RequestButton from '@renderer/components/customElements/saveButton/savebutton'
import ConfirmChanges from '@renderer/components/modals/confirm/confirmChanges'
import { CONFIRM_CHANGES } from '@renderer/lib/modals.lib'
import { useModal } from '@renderer/shared'
import UseBussines from '@renderer/store/bussines/bussines.store'
import { useEffect, useState } from 'react'

export default function Welcome() {
  const [process, setProcess] = useState(false)
  const [key, setKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [data, setData] = useState(null)
  const [device, setDevice] = useState(null)
  const URL_BASE = import.meta.env.VITE_API_URL_PATH

  async function searchBussiness(key: string) {
    setIsLoading(true)
    await fetch(`${URL_BASE}/business/${key}`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false)
        setData(data)
        setError(null)
      })
      .catch((error) => {
        setIsLoading(false)
        setError(error as Error)
        setData(null)
      })
  }

  const confirmChanges = useModal(CONFIRM_CHANGES)

  function formatWithHyphens(text) {
    if (!text) return ''
    return (
      text
        .replace(/[^a-zA-Z0-9]/g, '')
        .match(/.{1,4}/g)
        ?.join('-') || ''
    )
  }
  const isLoadingUpdate = UseBussines((state) => state.isLoading)
  const errorsUpdate = UseBussines((state) => state.errors)
  const updateDevice = UseBussines((state) => state.updateDevice)

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <main className={styles.screen}>
      <div>
        <header>
          <img src={tomateLogo} alt="tomate logo" />
          <p>Primeros pasos</p>
        </header>
        <main>
          {isLoading ? (
            <div>
              <p>Cargando...</p>
            </div>
          ) : !isLoading && !error && !process && data?.name ? (
            <div>
              <h3>{data?.name}</h3>
              <div>
                {data.branches.map((element, index) => (
                  <button
                    onClick={() => {
                      setDevice(element)
                      setProcess(true)
                    }}
                    key={index}
                  >
                    {element.name}
                  </button>
                ))}
              </div>
            </div>
          ) : process ? (
            <section>
              {device.devices.map((element, index) => (
                <div
                  key={index} // Mover el 'key' fuera del 'onClick'
                  onClick={async () => {
                    if (element?.status === true) {
                      const register = await fetch('http://localhost:3000/create-config', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json' // Asegúrate de especificar el tipo de contenido
                        },
                        body: JSON.stringify({
                          ...element,
                          branch: device?.name // 'branch' se asume que existe en el objeto device
                        })
                      })
                        .then((response) => response.json())
                        .then(async (data) => {
                          if (data.message === 'Archivo creado correctamente.') {
                            confirmChanges.openModal()
                            const res = await updateDevice(element?._id, {
                              status: false
                            })
                            if (res) {
                              return data
                            }
                          }
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    }
                    return
                  }}
                  style={!element?.status ? { opacity: 0.2 } : {}}
                >
                  <h3>{element.deviceName}</h3>
                  <p>{element.status ? 'Disponible' : 'No disponible'}</p>
                </div>
              ))}
            </section>
          ) : (
            <>
              <h3>Ingresa tu número de licencia:</h3>
              <input
                type="text"
                placeholder="64b9-f0e2-d1f4-a917-b6e1-2345"
                value={key}
                onChange={(e) => setKey(formatWithHyphens(e.target.value))} // Aplicar formato en tiempo real
              />
              <RequestButton
                mode="SEND_MODE"
                text="Continuar"
                isDisable={key.replace(/-/g, '').length !== 24}
                action={() => searchBussiness(key.replace(/-/g, ''))} // Remover guiones antes de la búsqueda
              >
                Continuar
              </RequestButton>
            </>
          )}
        </main>
        <footer>Necesitas ayuda? Consulta nuestro portal de atención en tomatesoft.com</footer>
        {confirmChanges.isOpen && confirmChanges.modalName ? (
          <ConfirmChanges
            isOpen={confirmChanges.isOpen}
            loading={isLoadingUpdate}
            errors={errorsUpdate}
            onClose={confirmChanges.closeModal}
            actionType={() => {
              updateDevice(device?._id, { status: false }), window.location.reload()
            }}
          >
            Terminal registrada
          </ConfirmChanges>
        ) : null}
      </div>
    </main>
  )
}
