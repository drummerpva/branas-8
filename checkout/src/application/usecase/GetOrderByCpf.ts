import { CatalogGateway } from '../gateway/CatalogGateway'
import { OrderRepository } from '../repository/OrderRepository'

export class GetOrderByCpf {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly catalogGateway?: CatalogGateway,
  ) {}

  async execute(cpf: string): Promise<Output[]> {
    const output: Output[] = []
    const orders = await this.orderRepository.getByCpf(cpf)
    for (const order of orders) {
      const orderItems: {
        idItem: number
        description: string
        quantity: number
        price: number
      }[] = []
      for (const orderItem of order.orderItems) {
        let description = ''
        const item = await this.catalogGateway?.getItem(orderItem.idItem)
        if (item) {
          description = item.description
        }
        orderItems.push({
          idItem: orderItem.idItem,
          quantity: orderItem.quantity,
          price: orderItem.price,
          description,
        })
      }

      output.push({
        total: order.getTotal(),
        orderItems,
        code: order.getCode(),
      })
    }
    return output
  }
}

type Output = {
  total: number
  code: string
  orderItems: {
    idItem: number
    quantity: number
    description: string
    price: number
  }[]
}
