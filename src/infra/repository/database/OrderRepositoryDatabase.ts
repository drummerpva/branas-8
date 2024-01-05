import { OrderRepository } from '../../../application/repository/OrderRepository'
import { Order } from '../../../domain/entity/Order'
import { OrderCoupon } from '../../../domain/entity/OrderCounpon'
import { OrderItem } from '../../../domain/entity/OrderItem'
import { Connection } from '../../database/Connection'

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    const orders: Order[] = []
    const ordersData = await this.connection.query(
      'SELECT * FROM orders WHERE cpf = ?',
      [cpf],
    )
    for (const orderData of ordersData) {
      const order = new Order(orderData.cpf, orderData.date, orderData.sequence)
      order.freight = Number(orderData.freight)
      if (orderData.coupon_code) {
        order.coupon = new OrderCoupon(
          orderData.coupon_code,
          orderData.coupon_percentage,
        )
      }
      const orderItemsData = await this.connection.query(
        'SELECT * FROM order_item WHERE order_id = ?',
        [orderData.id],
      )
      for (const orderItemData of orderItemsData) {
        order.orderItems.push(
          new OrderItem(
            orderItemData.id,
            Number(orderItemData.valor),
            orderItemData.quantity,
          ),
        )
      }
      orders.push(order)
    }
    return orders
  }

  async count(): Promise<number> {
    throw new Error('Method not implemented.')
  }
}
