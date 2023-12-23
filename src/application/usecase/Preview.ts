import { ItemRepository } from '../repository/ItemRepository'
import { Order } from '../../domain/entity/Order'

export class Preview {
  constructor(readonly itemRepository: ItemRepository) {}

  async execute(input: Input): Promise<number> {
    const order = new Order(input.cpf)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }
    const total = order.getTotal()
    return total
  }
}

type OrderItem = {
  idItem: number
  quantity: number
}

type Input = { cpf: string; orderItems: OrderItem[] }
