import { CouponRepository } from '../../application/repository/CouponRepository'
import { ItemRepository } from '../../application/repository/ItemRepository'
import { OrderRepository } from '../../application/repository/OrderRepository'
import { ZipCodeRepository } from '../../application/repository/ZipCodeRepository'

export interface RepositoryFactory {
  createItemRepository(): ItemRepository
  createCouponRepository(): CouponRepository
  createOrderRepository(): OrderRepository
  createZipCodeRepository(): ZipCodeRepository
}
