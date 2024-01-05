import { Checkout } from './application/usecase/Checkout'
import { GetOrderByCpf } from './application/usecase/GetOrderByCpf'
import { Preview } from './application/usecase/Preview'
import { SimulateFreight } from './application/usecase/SimulateFreight'
import { ValidateCoupon } from './application/usecase/ValidateCoupon'
import { Coupon } from './domain/entity/Coupon'
import { OrderController } from './infra/controller/OrderController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { RepositoyFactoryMemory } from './infra/factory/RepositoryFactoryMemory'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { HapiAdapter } from './infra/http/HapiAdapter'
import { CouponRepositoryMemory } from './infra/repository/memory/CouponRepositoryMemory'
import { ItemRepositoryDatabase } from './infra/repository/database/ItemRepositoryDatabase'
import { OrderRepositoryMemory } from './infra/repository/memory/OrderRepositoryMemory'

const connection = new Mysql2Adapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
couponRepository.save(new Coupon('VALE20', 20))
const preview = new Preview(itemRepository, couponRepository)
const repositoryFactory = new RepositoyFactoryMemory()
const checkout = new Checkout(repositoryFactory)
const getOrderByCpf = new GetOrderByCpf(orderRepository)
const simulateFreight = new SimulateFreight(itemRepository)
const validateCoupon = new ValidateCoupon(couponRepository)
// const httpServer = new ExpressAdapter()
const httpServer = new HapiAdapter()
new OrderController(
  httpServer,
  preview,
  checkout,
  getOrderByCpf,
  simulateFreight,
  validateCoupon,
)
httpServer.listen(3000)
