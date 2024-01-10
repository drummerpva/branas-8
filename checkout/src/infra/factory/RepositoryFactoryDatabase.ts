import { CouponRepository } from '../../application/repository/CouponRepository'
import { ItemRepository } from '../../application/repository/ItemRepository'
import { OrderRepository } from '../../application/repository/OrderRepository'
import { ZipCodeRepository } from '../../application/repository/ZipCodeRepository'
import { RepositoryFactory } from '../../domain/factory/RepositoryFactory'
import { Connection } from '../database/Connection'
import { CouponRepositoryDatabase } from '../repository/database/CouponRepositoryDatabase'
import { ItemRepositoryDatabase } from '../repository/database/ItemRepositoryDatabase'
import { OrderRepositoryDatabase } from '../repository/database/OrderRepositoryDatabase'
import { ZipCodeRepositoryDatabase } from '../repository/database/ZipCodeRepositoryDatabase'

export class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(readonly connection: Connection) {}
  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection)
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection)
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection)
  }

  createZipCodeRepository(): ZipCodeRepository {
    return new ZipCodeRepositoryDatabase(this.connection)
  }
}
