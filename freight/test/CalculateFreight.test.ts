import { ZipCodeRepository } from '../src/application/repository/ZipCodeRepository'
import { CalculateFreight } from '../src/application/usecase/CalculateFreight'
import { Connection } from '../src/infra/database/Connection'
import { Mysql2Adapter } from '../src/infra/database/Mysql2Adapter'
import { ZipCodeRepositoryDatabase } from '../src/infra/repository/database/ZipCodeRepositoryDatabase'

let zipCodeRepository: ZipCodeRepository
let connection: Connection
beforeEach(async () => {
  connection = new Mysql2Adapter()
  zipCodeRepository = new ZipCodeRepositoryDatabase(connection)
})
afterEach(async () => {
  await connection.close()
})
test('Deve simular o frete', async () => {
  const input = {
    orderItems: [{ volume: 0.03, density: 100, quantity: 1 }],
  }
  const sut = new CalculateFreight(zipCodeRepository)
  const freight = await sut.execute(input)
  expect(freight).toBe(30)
})
test('Deve simular o frete calculando a distancia', async () => {
  const input = {
    orderItems: [{ volume: 0.03, density: 100, quantity: 1 }],
    from: '88015600',
    to: '22060030',
  }
  const sut = new CalculateFreight(zipCodeRepository)
  const freight = await sut.execute(input)
  expect(freight).toBe(22.45)
})
