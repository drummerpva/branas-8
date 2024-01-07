import { Item } from './Item'

export class Beer extends Item {
  constructor(description: string, price: number) {
    super('Beer', description, price)
  }

  calculateTax(): number {
    return this.price * 0.1
  }
}
