import express from 'express'
import { InvoiceServiceImpl } from './InvoiceServiceImpl'
import { PurchaseRepositoryDatabase } from './PurchaseRepositoryDatabase'
import { CurrencyGatewayHttp } from './CurrenctGatewayHttp'
const app = express()
app.get('/cards/:cardNumber/invoices', async (req, res) => {
  const purchaseRepository = new PurchaseRepositoryDatabase()
  const currencyGateway = new CurrencyGatewayHttp()
  const invoiceService = new InvoiceServiceImpl(
    purchaseRepository,
    currencyGateway,
  )
  const total = await invoiceService.calculateInvoice(
    req.params.cardNumber,
    9,
    2022,
  )
  res.json({
    total,
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
