import { OrderRepository } from '../../application/repository/OrderRepository'
import { Order } from '../../domain/entity/Order'

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]
  constructor() {
    this.orders = []
  }

  async save(order: Order) {
    this.orders.push(order)
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    return this.orders.filter((order) => order.cpf.getValue() === cpf)
  }

  async count(): Promise<number> {
    return this.orders.length
  }
}
