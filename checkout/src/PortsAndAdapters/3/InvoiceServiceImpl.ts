import { CurrencyGateway } from './CurrencyGatewat'
import { Invoice } from './Invoice'
import { InvoiceService } from './InvoiceService'
import { PurchaseRepository } from './PurchaseRepository'

export class InvoiceServiceImpl implements InvoiceService {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private currencyGateway: CurrencyGateway,
  ) {}

  async calculateInvoice(
    cardNumber: string,
    month: number,
    year: number,
  ): Promise<number> {
    // driven
    const purchases = await this.purchaseRepository.getPurchase(
      cardNumber,
      month,
      year,
    )
    const currencyAmount = await this.currencyGateway.getCurrency()
    // application
    const invoice = new Invoice(currencyAmount)
    invoice.setPurchases(purchases)
    const total = invoice.getTotal()
    return total
  }
}
