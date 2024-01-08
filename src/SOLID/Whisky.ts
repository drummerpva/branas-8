import { TaxItem } from './TaxItem'

export class Whisky extends TaxItem {
  constructor(description: string, price: number) {
    super('Whisky', description, price)
  }

  calculateTax(): number {
    return this.price * 0.2
  }
}
