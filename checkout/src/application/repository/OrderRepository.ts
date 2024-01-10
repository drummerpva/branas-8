import { Order } from '../../domain/entity/Order'

export interface OrderRepository {
  save(order: Order): Promise<void>
  getByCpf(cpf: string): Promise<Order[]>
  count(): Promise<number>
}
