import { ItemRepository } from '../src/application/repository/ItemRepository'
import { ZipCodeRepository } from '../src/application/repository/ZipCodeRepository'
import { SimulateFreight } from '../src/application/usecase/SimulateFreight'
import { Dimension } from '../src/domain/entity/Dimension'
import { Item } from '../src/domain/entity/Item'
import { Connection } from '../src/infra/database/Connection'
import { Mysql2Adapter } from '../src/infra/database/Mysql2Adapter'
import { ItemRepositoryMemory } from '../src/infra/repository/memory/ItemRepositoryMemory'
import { ZipCodeRepositoryDatabase } from '../src/infra/repository/database/ZipCodeRepositoryDatabase'

let itemRepository: ItemRepository
let zipCodeRepository: ZipCodeRepository
let connection: Connection
beforeEach(async () => {
  connection = new Mysql2Adapter()
  itemRepository = new ItemRepositoryMemory()
  zipCodeRepository = new ZipCodeRepositoryDatabase(connection)
})
afterEach(async () => {
  await connection.close()
})
test('Deve simular o frete', async () => {
  itemRepository.save(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)),
  )
  const input = {
    orderItems: [{ idItem: 1, quantity: 1 }],
  }
  const sut = new SimulateFreight(itemRepository, zipCodeRepository)
  const freight = await sut.execute(input)
  expect(freight).toBe(30)
})
test('Deve simular o frete calculando a distancia', async () => {
  itemRepository.save(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)),
  )
  const input = {
    orderItems: [{ idItem: 1, quantity: 1 }],
    from: '88015600',
    to: '22060030',
  }
  const sut = new SimulateFreight(itemRepository, zipCodeRepository)
  const freight = await sut.execute(input)
  expect(freight).toBe(22.45)
})
