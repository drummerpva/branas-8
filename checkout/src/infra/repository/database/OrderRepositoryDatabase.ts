import { OrderRepository } from '../../../application/repository/OrderRepository'
import { Order } from '../../../domain/entity/Order'
import { OrderCoupon } from '../../../domain/entity/OrderCounpon'
import { OrderItem } from '../../../domain/entity/OrderItem'
import { Connection } from '../../database/Connection'

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const { insertId: orderId } = await this.connection.query(
      `INSERT INTO orders(coupon_code, coupon_percentage, code, cpf, issue_date, sequence, total, freight) VALUES(?,?,?,?,?,?,?,?)`,
      [
        order.coupon?.code,
        order.coupon?.percentage,
        order.getCode(),
        order.cpf.getValue(),
        order.date,
        order.sequence,
        order.getTotal(),
        order.freight,
      ],
    )
    for (const orderItem of order.orderItems) {
      await this.connection.query(
        `INSERT INTO order_item(id_order, id_item, price, quantity) VALUES(?,?,?,?)`,
        [orderId, orderItem.idItem, orderItem.price, orderItem.quantity],
      )
    }
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    const orders: Order[] = []
    const ordersData = await this.connection.query(
      'SELECT * FROM orders WHERE cpf = ?',
      [cpf],
    )
    for (const orderData of ordersData) {
      const order = new Order(
        orderData.cpf,
        orderData.issue_date,
        orderData.sequence,
      )
      order.freight = Number(orderData.freight)
      if (orderData.coupon_code) {
        order.coupon = new OrderCoupon(
          orderData.coupon_code,
          orderData.coupon_percentage,
        )
      }
      const orderItemsData = await this.connection.query(
        'SELECT * FROM order_item WHERE id_order = ?',
        [orderData.id_order],
      )
      for (const orderItemData of orderItemsData) {
        order.orderItems.push(
          new OrderItem(
            orderItemData.id_item,
            Number(orderItemData.price),
            orderItemData.quantity,
          ),
        )
      }
      orders.push(order)
    }
    return orders
  }

  async count(): Promise<number> {
    const [countData] = await this.connection.query(
      'SELECT COUNT(1) AS count FROM orders',
      [],
    )
    return countData.count
  }
}
