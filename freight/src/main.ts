import { CalculateFreight } from './application/usecase/CalculateFreight'
import { RestController } from './infra/controller/RestController'
import { Mysql2Adapter } from './infra/database/Mysql2Adapter'
import { HapiAdapter } from './infra/http/HapiAdapter'
import { ZipCodeRepositoryDatabase } from './infra/repository/database/ZipCodeRepositoryDatabase'

const connection = new Mysql2Adapter()
const zipCodeRepository = new ZipCodeRepositoryDatabase(connection)
const simulateFreight = new CalculateFreight(zipCodeRepository)
const httpServer = new HapiAdapter()
new RestController(httpServer, simulateFreight)
httpServer.listen(3001)
