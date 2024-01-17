import { Checkout } from './application/usecase/Checkout'
import { GetOrderByCpf } from './application/usecase/GetOrderByCpf'
import { Preview } from './application/usecase/Preview'
import { SimulateFreight } from './application/usecase/SimulateFreight'
import { ValidateCoupon } from './application/usecase/ValidateCoupon'
import { Coupon } from './domain/entity/Coupon'
import { OrderController } from './infra/controller/OrderController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { RepositoyFactoryMemory } from './infra/factory/RepositoryFactoryMemory'
import { CouponRepositoryMemory } from './infra/repository/memory/CouponRepositoryMemory'
import { ItemRepositoryDatabase } from './infra/repository/database/ItemRepositoryDatabase'
import { OrderRepositoryMemory } from './infra/repository/memory/OrderRepositoryMemory'
import { ZipCodeRepositoryDatabase } from './infra/repository/database/ZipCodeRepositoryDatabase'
import { CalculateFreightGatewayHttp } from './infra/gateway/CalculateFreightGatewayHttp'
import { CatalogGatewayHttp } from './infra/gateway/CatalogGatewayHttp'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { DecrementStockGatewayHttp } from './infra/gateway/DecrementStockGatewayHttp'
import { RabbitMQAdapter } from './infra/queue/RabbitMQAdapter'

async function init() {
  const connection = new Mysql2Adapter()
  const itemRepository = new ItemRepositoryDatabase(connection)
  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  const zipCodeRepository = new ZipCodeRepositoryDatabase(connection)
  couponRepository.save(new Coupon('VALE20', 20))
  const calculateFreightGateway = new CalculateFreightGatewayHttp()
  const catalogGateway = new CatalogGatewayHttp()
  const preview = new Preview(
    catalogGateway,
    couponRepository,
    calculateFreightGateway,
  )
  const repositoryFactory = new RepositoyFactoryMemory()
  const decrementStockGateway = new DecrementStockGatewayHttp()
  const queue = new RabbitMQAdapter()
  await queue.connect()
  const checkout = new Checkout(repositoryFactory, decrementStockGateway, queue)
  const getOrderByCpf = new GetOrderByCpf(orderRepository)
  const simulateFreight = new SimulateFreight(itemRepository, zipCodeRepository)
  const validateCoupon = new ValidateCoupon(couponRepository)
  const httpServer = new ExpressAdapter()
  new OrderController(
    httpServer,
    preview,
    checkout,
    getOrderByCpf,
    simulateFreight,
    validateCoupon,
  )
  httpServer.listen(3000)
}
init()
