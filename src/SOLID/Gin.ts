import { TaxItem } from './TaxItem'

export class Gin extends TaxItem {
  constructor(description: string, price: number) {
    super('Gin', description, price)
  }

  getTax(): number {
    return 0.2
  }
}
