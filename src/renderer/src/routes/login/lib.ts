export const updateConfig = async () => {
  if (element?.status === true) {
    const register = await fetch('http://localhost:8114/config/create-config', {
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
}
