import { DecrementStock } from './application/usecase/DecrementStock'
import { GetStock } from './application/usecase/GetStock'
import { QueueController } from './infra/controller/QueueController'
import { RestController } from './infra/controller/RestController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { RabbitMQAdapter } from './infra/queue/RabbitMQAdapter'
import { StockRepositoryDatabase } from './infra/repository/database/StockRepositoryDatabase'

async function init() {
  const connection = new Mysql2Adapter()
  const stockRepository = new StockRepositoryDatabase(connection)
  const decrementStock = new DecrementStock(stockRepository)
  const getStock = new GetStock(stockRepository)

  const queue = new RabbitMQAdapter()
  await queue.connect()
  new QueueController(queue, decrementStock)

  const httpServer = new ExpressAdapter()
  new RestController(httpServer, decrementStock, getStock)
  httpServer.listen(3003)
}
init()
