import { Item } from './Item'

export class Juice extends Item {
  constructor(description: string, price: number) {
    super('Juice', description, price)
  }
}
