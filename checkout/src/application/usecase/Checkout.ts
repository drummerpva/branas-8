import { ItemRepository } from '../repository/ItemRepository'
import { Order } from '../../domain/entity/Order'
import { OrderRepository } from '../repository/OrderRepository'
import { CouponRepository } from '../repository/CouponRepository'
import { RepositoryFactory } from '../../domain/factory/RepositoryFactory'
import { FreightCalculator } from '../../domain/entity/FreightCalculator'
import { ZipCodeRepository } from '../repository/ZipCodeRepository'
import { DistanceCalculator } from '../../domain/entity/DistanceCalculator'
import { DecrementStockGateway } from '../gateway/DecrementStockGateway'
import { Queue } from '../../infra/queue/Queue'

export class Checkout {
  itemRepository: ItemRepository
  orderRepository: OrderRepository
  couponRepository: CouponRepository
  zipCodeRepository: ZipCodeRepository
  constructor(
    repositoryFactory: RepositoryFactory,
    readonly decrementStockGateway: DecrementStockGateway,
    readonly queue: Queue,
  ) {
    this.itemRepository = repositoryFactory.createItemRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
    this.zipCodeRepository = repositoryFactory.createZipCodeRepository()
  }

  async execute(input: Input): Promise<void> {
    const nextSequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.cpf, input.date, nextSequence)
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
      // await this.decrementStockGateway.execute(
      //   orderItem.idItem,
      //   orderItem.quantity,
      // )
      await this.queue.publish('checkout', {
        idItem: orderItem.idItem,
        quantity: orderItem.quantity,
      })
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

type Input = {
  cpf: string
  orderItems: OrderItem[]
  coupon?: string
  date?: Date
  from?: string
  to?: string
}
