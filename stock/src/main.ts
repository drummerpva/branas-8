import { DecrementStock } from './application/usecase/DecrementStock'
import { GetStock } from './application/usecase/GetStock'
import { RestController } from './infra/controller/RestController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { RabbitMQAdapter } from './infra/queue/RabbitMQAdapter'
import { StockRepositoryDatabase } from './infra/repository/database/StockRepositoryDatabase'

async function init() {
  const connection = new Mysql2Adapter()
  const httpServer = new ExpressAdapter()
  const stockRepository = new StockRepositoryDatabase(connection)
  const decrementStock = new DecrementStock(stockRepository)
  const getStock = new GetStock(stockRepository)
  new RestController(httpServer, decrementStock, getStock)
  const queue = new RabbitMQAdapter()
  await queue.connect()
  queue.on('checkout', 'checkout.decrementStock', async (message: any) => {
    const data = JSON.parse(message)
    console.log(data)
    await decrementStock.execute(data)
  })

  httpServer.listen(3003)
}
init()
