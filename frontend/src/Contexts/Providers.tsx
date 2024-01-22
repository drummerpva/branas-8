'use client'
import { ThemeProvider } from '@/components/ThemeProvider'
import { DependencyProvider } from './Dependencies'
import { CatalogHttpGateway } from '@/gateways/CatalogHttpGateway'
import { CheckoutHttpGateway } from '@/gateways/CheckoutHttpGateway'
import { AxiosAdapter } from '@/infra/AxiosAdapter'

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const httpClient = new AxiosAdapter()
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <DependencyProvider
        value={{
          catalogGateway: new CatalogHttpGateway(
            httpClient,
            'http://localhost:3002',
          ),
          checkoutGateway: new CheckoutHttpGateway(
            httpClient,
            'http://localhost:3000',
          ),
        }}
      >
        {children}
      </DependencyProvider>
    </ThemeProvider>
  )
}
