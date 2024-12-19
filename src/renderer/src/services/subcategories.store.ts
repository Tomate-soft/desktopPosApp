import axios from '@renderer/configs/axios'

/// haremos un servicio para traer todas las subcategorias
export const getSubcategoriesService = async () => {
  const response = await axios(`/subcategory-one`)
  return response
}
