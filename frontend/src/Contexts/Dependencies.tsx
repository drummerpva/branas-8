import { CatalogGateway } from '@/gateways/CatalogGateway'
import { CheckoutGateway } from '@/gateways/CheckoutGateway'
import { createContext, useContext } from 'react'

type Dependencies = {
  catalogGateway: CatalogGateway
  checkoutGateway: CheckoutGateway
}

const dependecyContext = createContext<Dependencies>({} as Dependencies)

export const DependencyProvider = dependecyContext.Provider

export const useDependecies = () => {
  const context = useContext(dependecyContext)
  return {
    catalogGateway: context.catalogGateway,
    checkoutGateway: context.checkoutGateway,
  }
}
