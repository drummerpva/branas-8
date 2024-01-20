import { GetItem } from './application/usecase/GetItem'
import { GetItems } from './application/usecase/GetItems'
import { RestController } from './infra/controller/RestController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { ItemRepositoryDatabase } from './infra/repository/database/ItemRepositoryDatabase'

const connection = new Mysql2Adapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const httpServer = new ExpressAdapter()
// const httpServer = new HapiAdapter()
const getItem = new GetItem(itemRepository)
const getItems = new GetItems(itemRepository)
new RestController(httpServer, getItem, getItems)
httpServer.listen(3002)
