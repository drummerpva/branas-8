import { ItemRepository } from '../repository/ItemRepository'
import { Order } from '../../domain/entity/Order'
import { CouponRepository } from '../repository/CouponRepository'
import { ZipCodeRepository } from '../repository/ZipCodeRepository'
import { DistanceCalculator } from '../../domain/entity/DistanceCalculator'
import { FreightCalculator } from '../../domain/entity/FreightCalculator'

export class Preview {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository,
    readonly zipCodeRepository: ZipCodeRepository,
  ) {}

  async execute(input: Input): Promise<number> {
    const order = new Order(input.cpf)
    let distance
    if (input.from && input.to) {
      const from = await this.zipCodeRepository.getByCode(input.from)
      const to = await this.zipCodeRepository.getByCode(input.to)
      distance = DistanceCalculator.calculate(from.coordinate, to.coordinate)
    }
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
      order.freight +=
        FreightCalculator.calculate(item, distance) * orderItem.quantity
    }
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
