import { FreightCalculator } from '../../domain/entity/FreightCalculator'
import { ItemRepository } from '../repository/ItemRepository'

export class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) {}

  async execute(input: Input): Promise<number> {
    let total = 0
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      total += FreightCalculator.calculate(item) * orderItem.quantity
    }
    return total
  }
}

type Input = {
  orderItems: {
    idItem: number
    quantity: number
  }[]
}
