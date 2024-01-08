import { Item } from './Item'

export abstract class TaxItem extends Item {
  calculateTax(): number {
    return this.price * this.getTax()
  }

  abstract getTax(): number
}
