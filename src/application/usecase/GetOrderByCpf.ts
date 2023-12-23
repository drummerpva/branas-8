import { OrderRepository } from '../repository/OrderRepository'

export class GetOrderByCpf {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(cpf: string): Promise<Output[]> {
    const output: Output[] = []
    const orders = await this.orderRepository.getByCpf(cpf)
    for (const order of orders) {
      output.push({
        total: order.getTotal(),
      })
    }
    return output
  }
}

type Output = {
  total: number
}
