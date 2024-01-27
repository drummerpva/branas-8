import { render } from '@testing-library/react'
import { Checkout } from '@/views/Checkout'
import { DependencyProvider } from '@/Contexts/Dependencies'
import { CatalogGateway } from '@/gateways/CatalogGateway'
import { CheckoutGateway } from '@/gateways/CheckoutGateway'
import { userEvent } from '@testing-library/user-event'
import { Item } from '@/entities/Item'

const catalogGateway: CatalogGateway = {
  getItems: async function (): Promise<any> {
    return [new Item(1, 'Guitarra', 1000)]
  },
}
const checkoutGateway: CheckoutGateway = {
  preview: async function (): Promise<any> {
    return 1030
  },
  checkout: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  validateCoupon: function (): Promise<boolean> {
    throw new Error('Function not implemented.')
  },
  getOrdersByCpf: function (): Promise<any> {
    throw new Error('Function not implemented.')
  },
}

test('Deve testar o componente Checkout', async () => {
  const { findByTestId, findByText } = render(
    <DependencyProvider
      value={{
        catalogGateway,
        checkoutGateway,
      }}
    >
      <Checkout />
    </DependencyProvider>,
  )
  const totalBefore = await findByText('Total: 0')
  expect(totalBefore).toBeInTheDocument()
  const addItem1 = await findByTestId('add-item-1')
  await userEvent.click(addItem1)
  const totalAfter = await findByText('Total: 1030')
  expect(totalAfter).toBeInTheDocument()
})
