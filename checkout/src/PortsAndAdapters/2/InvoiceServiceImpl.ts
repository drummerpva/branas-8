import { CurrencyGatewayHttp } from './CurrenctGatewayHttp'
import { CurrencyGateway } from './CurrencyGatewat'
import { InvoiceService } from './InvoiceService'
import { PurchaseRepository } from './PurchaseRepository'
import { PurchaseRepositoryDatabase } from './PurchaseRepositoryDatabase'

export class InvoiceServiceImpl implements InvoiceService {
  private purchaseRepository: PurchaseRepository
  private currencyGateway: CurrencyGateway
  constructor() {
    this.purchaseRepository = new PurchaseRepositoryDatabase()
    this.currencyGateway = new CurrencyGatewayHttp()
  }

  async calculateInvoice(cardNumber: string): Promise<number> {
    const date = new Date()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    // driven
    const purchases = await this.purchaseRepository.getPurchase(
      cardNumber,
      month,
      year,
    )
    const currencyAmount = await this.currencyGateway.getCurrency()
    // application
    let total = 0
    for (const purchase of purchases as any[]) {
      if (purchase.currency === 'USD') {
        total += purchase.amount * currencyAmount
        continue
      }
      total += purchase.amount
    }
    return total
  }
}
