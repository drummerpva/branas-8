import { Item } from './Item'

export class Whisky extends Item {
  constructor(description: string, price: number) {
    super('Whisky', description, price)
  }

  calculateTax(): number {
    return this.price * 0.2
  }
}
