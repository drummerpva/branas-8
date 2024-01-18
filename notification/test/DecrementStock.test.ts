import { StockRepository } from '../src/application/repository/StockRepository'
import { DecrementStock } from '../src/application/usecase/DecrementStock'
import { GetStock } from '../src/application/usecase/NotifyCustomer'
import { StockEntry } from '../src/domain/entity/StockEntry'
import { Connection } from '../src/infra/database/Connection'
import { Mysql2Adapter } from '../src/infra/database/Mysql2Adapter'
import { StockRepositoryDatabase } from '../src/infra/repository/database/StockRepositoryDatabase'

let stockRepository: StockRepository
let connection: Connection
beforeEach(async () => {
  connection = new Mysql2Adapter()
  stockRepository = new StockRepositoryDatabase(connection)
  // stockRepository = new StockRepositoryMemory()
  await connection.query(`DELETE FROM stock_entry`, [])
})

test('Deve decrementar o estoque', async () => {
  stockRepository.save(new StockEntry(1, 'in', 20))
  const decrementStock = new DecrementStock(stockRepository)
  const input = {
    idItem: 1,
    quantity: 10,
  }
  await decrementStock.execute(input)
  const getStock = new GetStock(stockRepository)
  const stockItem = await getStock.execute(input.idItem)
  expect(stockItem.total).toBe(10)
})
