import { CouponRepository } from '../../application/repository/CouponRepository'
import { ItemRepository } from '../../application/repository/ItemRepository'
import { OrderRepository } from '../../application/repository/OrderRepository'
import { ZipCodeRepository } from '../../application/repository/ZipCodeRepository'
import { RepositoryFactory } from '../../domain/factory/RepositoryFactory'
import { CouponRepositoryMemory } from '../repository/CouponRepositoryMemory'
import { ItemRepositoryMemory } from '../repository/ItemRepositoryMemory'
import { OrderRepositoryMemory } from '../repository/OrderRepositoryMemory'
import { ZipCodeRepositoryMemory } from '../repository/ZipCodeRepositoryMemory'

export class RepositoyFactoryMemory implements RepositoryFactory {
  itemRepository?: ItemRepository
  couponRepository?: CouponRepository
  orderRepository?: OrderRepository
  zipCodeRepository?: ZipCodeRepository

  createItemRepository(): ItemRepository {
    if (!this.itemRepository) {
      this.itemRepository = new ItemRepositoryMemory()
    }
    return this.itemRepository
  }

  createCouponRepository(): CouponRepository {
    if (!this.couponRepository) {
      this.couponRepository = new CouponRepositoryMemory()
    }
    return this.couponRepository
  }

  createOrderRepository(): OrderRepository {
    if (!this.orderRepository) {
      this.orderRepository = new OrderRepositoryMemory()
    }
    return this.orderRepository
  }

  createZipCodeRepository(): ZipCodeRepository {
    if (!this.zipCodeRepository) {
      this.zipCodeRepository = new ZipCodeRepositoryMemory()
    }
    return this.zipCodeRepository
  }
}
