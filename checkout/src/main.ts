import { Checkout } from './application/usecase/Checkout'
import { GetOrderByCpf } from './application/usecase/GetOrderByCpf'
import { Preview } from './application/usecase/Preview'
import { SimulateFreight } from './application/usecase/SimulateFreight'
import { ValidateCoupon } from './application/usecase/ValidateCoupon'
import { Coupon } from './domain/entity/Coupon'
import { OrderController } from './infra/controller/OrderController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { RepositoyFactoryMemory } from './infra/factory/RepositoryFactoryMemory'
import { HapiAdapter } from './infra/http/HapiAdapter'
import { CouponRepositoryMemory } from './infra/repository/memory/CouponRepositoryMemory'
import { ItemRepositoryDatabase } from './infra/repository/database/ItemRepositoryDatabase'
import { OrderRepositoryMemory } from './infra/repository/memory/OrderRepositoryMemory'
import { ZipCodeRepositoryDatabase } from './infra/repository/database/ZipCodeRepositoryDatabase'
import { CalculateFreightGatewayHttp } from './infra/gateway/CalculateFreightGatewayHttp'

const connection = new Mysql2Adapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
const zipCodeRepository = new ZipCodeRepositoryDatabase(connection)
couponRepository.save(new Coupon('VALE20', 20))
// const calculateFreightGateway: CalculateFreightGateway = {
//   calculate: async () => 280,
// }
const calculateFreightGateway = new CalculateFreightGatewayHttp()
const preview = new Preview(
  itemRepository,
  couponRepository,
  calculateFreightGateway,
)
const repositoryFactory = new RepositoyFactoryMemory()
const checkout = new Checkout(repositoryFactory)
const getOrderByCpf = new GetOrderByCpf(orderRepository)
const simulateFreight = new SimulateFreight(itemRepository, zipCodeRepository)
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