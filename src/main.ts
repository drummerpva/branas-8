import { Checkout } from './application/usecase/Checkout'
import { GetOrderByCpf } from './application/usecase/GetOrderByCpf'
import { Preview } from './application/usecase/Preview'
import { Coupon } from './domain/entity/Coupon'
import { Item } from './domain/entity/Item'
import { OrderController } from './infra/controller/OrderController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { CouponRepositoryMemory } from './infra/repository/CouponRepositoryMemory'
import { ItemRepositoryDatabase } from './infra/repository/ItemRepositoryDatabase'
import { ItemRepositoryMemory } from './infra/repository/ItemRepositoryMemory'
import { OrderRepositoryMemory } from './infra/repository/OrderRepositoryMemory'

const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, 'Guitarra', 1000))
itemRepository.save(new Item(2, 'Amplificador', 5000))
itemRepository.save(new Item(3, 'Cabo', 30))
// const connection = new Mysql2Adapter()
// const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
couponRepository.save(new Coupon('VALE20', 20))
const preview = new Preview(itemRepository, couponRepository)
const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
const getOrderByCpf = new GetOrderByCpf(orderRepository)
const httpServer = new ExpressAdapter()
// const httpServer = new HapiAdapter()
new OrderController(httpServer, preview, checkout, getOrderByCpf)
httpServer.listen(3000)
