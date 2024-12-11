interface Price {
  name: string
  price: number
}

interface Dish {
  name: string
  prices: Price[]
}

interface Product {
  quantity: number
  prices: Price[]
  dishes?: Dish[]
}

// Calcula el total de un solo producto, incluyendo `dishes` si existen.
export const calculateProductTotal = (product: Product): number => {
  const { quantity, prices, dishes } = product

  // Calcula el total del producto base (sin dishes).
  const baseTotal = quantity * prices[0].price

  if (dishes) {
    // Calcula el total de los primeros precios de los dishes.
    const dishesTotal = dishes.reduce((sum, dish) => {
      if (dish.prices.length > 0) {
        return sum + dish.prices[0].price
      }
      return sum
    }, 0)
    // Suma el total del producto base con el total de los dishes.
    return baseTotal + dishesTotal
  }
  return baseTotal
}

// Calcula el total de una lista de productos.
export const calculateBillTotal = (products: Product[]): string => {
  if (!products.length) return '0.00'

  // Suma el total de cada producto (incluyendo sus dishes) usando `calculateProductTotal`.
  const total = products.reduce((sum, product) => sum + calculateProductTotal(product), 0)

  return total.toFixed(2).toString()
}
