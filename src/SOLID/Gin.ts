import { Item } from './Item'

export class Gin extends Item {
  constructor(description: string, price: number) {
    super('Gin', description, price)
  }

  calculateTax(): number {
    return this.price * 0.2
  }
}
