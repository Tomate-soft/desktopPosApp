import { useImpressionManagement } from '@renderer/store/impressionManagement.store'

export default function UseImpression() {
  const { isLoading, errors, printRestaurantOrderTicket } = useImpressionManagement()

  return {
    isLoading,
    errors,
    printRestaurantOrderTicket
  }
}
