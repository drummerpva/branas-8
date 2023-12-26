import { ItemRepository } from '../repository/ItemRepository'
import { Order } from '../../domain/entity/Order'
import { OrderRepository } from '../repository/OrderRepository'
import { CouponRepository } from '../repository/CouponRepository'

export class Checkout {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository,
    readonly couponRepository: CouponRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const order = new Order(input.cpf)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon)
      if (coupon) {
        order.addCoupon(coupon)
      }
    }
    await this.orderRepository.save(order)
  }
}

type OrderItem = {
  idItem: number
  quantity: number
}

type Input = { cpf: string; orderItems: OrderItem[]; coupon?: string }
