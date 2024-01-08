import { TaxItem } from './TaxItem'

export class Beer extends TaxItem {
  constructor(description: string, price: number) {
    super('Beer', description, price)
  }

  calculateTax(): number {
    return this.price * 0.1
  }
}
