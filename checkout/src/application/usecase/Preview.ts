import { Order } from '../../domain/entity/Order'
import { CouponRepository } from '../repository/CouponRepository'
import { CalculateFreightGateway } from '../gateway/CalculateFreightGateway'
import { CatalogGateway } from '../gateway/CatalogGateway'

export class Preview {
  constructor(
    readonly catalogGateway: CatalogGateway,
    readonly couponRepository: CouponRepository,
    readonly calculateFreightGateway: CalculateFreightGateway,
  ) {}

  async execute(input: Input): Promise<number> {
    const orderItems = []
    const order = new Order(input.cpf)
    for (const orderItem of input.orderItems) {
      const item = await this.catalogGateway.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
      orderItems.push({
        volume: item.getVolume(),
        density: item.getDensity(),
        quantity: orderItem.quantity,
      })
    }
    order.freight = await this.calculateFreightGateway.calculate(
      orderItems,
      input.from,
      input.to,
    )
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon)
      if (coupon) {
        order.addCoupon(coupon)
      }
    }
    const total = order.getTotal()
    return total
  }
}

type OrderItem = {
  idItem: number
  quantity: number
}

type Input = {
  cpf: string
  orderItems: OrderItem[]
  coupon?: string
  from?: string
  to?: string
}
