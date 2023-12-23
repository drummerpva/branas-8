import { Checkout } from './application/usecase/Checkout'
import { GetOrderByCpf } from './application/usecase/GetOrderByCpf'
import { Preview } from './application/usecase/Preview'
import { Item } from './domain/entity/Item'
import { OrderController } from './infra/controller/OrderController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { ItemRepositoryDatabase } from './infra/repository/ItemRepositoryDatabase'
import { ItemRepositoryMemory } from './infra/repository/ItemRepositoryMemory'
import { OrderRepositoryMemory } from './infra/repository/OrderRepositoryMemory'

const itemRepository = new ItemRepositoryMemory()
// const connection = new Mysql2Adapter()
// const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryMemory()
itemRepository.save(new Item(1, 'Guitarra', 1000))
itemRepository.save(new Item(2, 'Amplificador', 5000))
itemRepository.save(new Item(3, 'Cabo', 30))
const preview = new Preview(itemRepository)
const checkout = new Checkout(itemRepository, orderRepository)
const getOrderByCpf = new GetOrderByCpf(orderRepository)
const httpServer = new ExpressAdapter()
// const httpServer = new HapiAdapter()
new OrderController(httpServer, preview, checkout, getOrderByCpf)
httpServer.listen(3000)
