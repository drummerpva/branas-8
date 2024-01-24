import { Item } from './Item'
import { Observable } from './Observable'
import { OrderItem } from './OrderItem'

export class Order extends Observable {
  orderItems: OrderItem[]
  coupon = ''
  constructor(readonly cpf: string) {
    super()
    this.orderItems = []
  }

  addItem(item: Item) {
    const existingOrderItem = this.orderItems.find(
      (orderItem: OrderItem) => orderItem.idItem === item.idItem,
    )
    if (existingOrderItem) {
      existingOrderItem.quantity++
    } else {
      this.orderItems.push(new OrderItem(item.idItem, 1))
    }
    this.notify('addOrderItem', this)
  }

  removeItem(order: OrderItem) {
    const existingOrderItem = this.orderItems.find(
      (orderItem: OrderItem) => orderItem.idItem === order.idItem,
    )
    if (existingOrderItem) {
      existingOrderItem.quantity--
      if (existingOrderItem.quantity <= 0) {
        this.orderItems = this.orderItems.filter(
          (orderItem: OrderItem) => orderItem.idItem !== order.idItem,
        )
      }
    }
    this.notify('removeOrderItem', this)
  }
}
