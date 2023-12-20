import { CurrencyGateway } from '../../../src/PortsAndAdapters/3/CurrencyGatewat'
import { Purchase } from '../../../src/PortsAndAdapters/3/Purchase'
import { PurchaseRepository } from '../../../src/PortsAndAdapters/3/PurchaseRepository'
import { InvoiceServiceImpl } from '../../../src/PortsAndAdapters/3/InvoiceServiceImpl'

test('Deve testar o calculo da fatura usando stub', async () => {
  const purchaseRepositoryFake: PurchaseRepository = {
    getPurchase: async function (): Promise<Purchase[]> {
      return [new Purchase('1234123412341234', 100, 'USD')]
    },
  }
  const curencyGatewayFake: CurrencyGateway = {
    getCurrency: async function (): Promise<number> {
      return 3
    },
  }
  const invoiceService = new InvoiceServiceImpl(
    purchaseRepositoryFake,
    curencyGatewayFake,
  )
  const total = await invoiceService.calculateInvoice('123', 123, 123)
  expect(total).toBe(300)
})
