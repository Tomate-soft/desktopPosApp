import axios from '@renderer/configs/axios'

export const updateDevice = async (id: string, body: any) => {
  const response = await axios.put(`device/${id}`, body)
  return response
}

export const getLocalConfig = async () => {
  const response = await axios.get('http://localhost:8114/config')
  return response
}

export const updateSettingsDevice = async () => {
  const currentConfig = await getLocalConfig()
  const data = currentConfig.data
  const branchId = data.branch
  const deviceId = data._id
  const device = await axios(`device/${deviceId}`)
  const printersArray = (await axios('./printers')).data
  return {
    ...device.data,
    branch: branchId,
    printersArray
  }

  // vamos a actualizar los settings de este dispositivo
}
