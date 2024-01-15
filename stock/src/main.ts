import { DecrementStock } from './application/usecase/DecrementStock'
import { GetStock } from './application/usecase/GetStock'
import { RestController } from './infra/controller/RestController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { StockRepositoryDatabase } from './infra/repository/database/StockRepositoryDatabase'

const connection = new Mysql2Adapter()
const httpServer = new ExpressAdapter()
const stockRepository = new StockRepositoryDatabase(connection)
const decrementStock = new DecrementStock(stockRepository)
const getStock = new GetStock(stockRepository)
new RestController(httpServer, decrementStock, getStock)
httpServer.listen(3003)
