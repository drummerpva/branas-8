import sinon from 'sinon'
import { CurrencyGatewayHttp } from '../../../src/PortsAndAdapters/2/CurrenctGatewayHttp'
import { InvoiceServiceImpl } from '../../../src/PortsAndAdapters/2/InvoiceServiceImpl'
import { PurchaseRepositoryDatabase } from '../../../src/PortsAndAdapters/2/PurchaseRepositoryDatabase'
import axios from 'axios'

test('Deve testar o calculo da fatura usando stub', async () => {
  sinon.stub(CurrencyGatewayHttp.prototype, 'getCurrency').resolves(3)
  sinon.stub(Date.prototype, 'getMonth').returns(8)
  sinon.stub(Date.prototype, 'getFullYear').returns(2022)
  // sinon
  //   .stub(PurchaseRepositoryDatabase.prototype, 'getPurchase')
  //   .resolves([new Purchase('1234123412341234', 100, 'USD')])
  const invoiceService = new InvoiceServiceImpl()
  const total = await invoiceService.calculateInvoice('1234123412341234')
  expect(total).toBe(690)
  // expect(total).toBe(300)
  sinon.restore()
})
test('Deve testar o calculo da fatura usando spy', async () => {
  sinon.stub(Date.prototype, 'getMonth').returns(8)
  sinon.stub(Date.prototype, 'getFullYear').returns(2022)
  const getPurchaseSpy = sinon.spy(
    PurchaseRepositoryDatabase.prototype,
    'getPurchase',
  )
  const invoiceService = new InvoiceServiceImpl()
  const total = await invoiceService.calculateInvoice('1234123412341234')
  expect(total).toBe(690)
  expect(getPurchaseSpy.calledWith('1234123412341234', 9, 2022)).toBe(true)
  expect(getPurchaseSpy.calledOnce).toBe(true)
  sinon.restore()
})
test('Deve testar o calculo da fatura usando mock', async () => {
  sinon.stub(Date.prototype, 'getMonth').returns(8)
  sinon.stub(Date.prototype, 'getFullYear').returns(2022)
  const axiosMock = sinon.mock(axios)
  axiosMock
    .expects('get')
    .withArgs('http://localhost:3001/currencies')
    .resolves({ data: { amount: 3 } })
  const invoiceService = new InvoiceServiceImpl()
  const total = await invoiceService.calculateInvoice('1234123412341234')
  expect(total).toBe(690)
  axiosMock.verify()
  sinon.restore()
})
