import { Item } from './Item'

export class Water extends Item {
  constructor(description: string, price: number) {
    super('Water', description, price)
  }

  calculateTax(): number {
    throw new Error('Water is tax free')
  }
}
