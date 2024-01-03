import { ItemRepositoryMemory } from '../src/infra/repository/ItemRepositoryMemory'
import { Preview } from '../src/application/usecase/Preview'
import { Item } from '../src/domain/entity/Item'
import { CouponRepository } from '../src/application/repository/CouponRepository'
import { ItemRepository } from '../src/application/repository/ItemRepository'
import { Coupon } from '../src/domain/entity/Coupon'
import { CouponRepositoryMemory } from '../src/infra/repository/CouponRepositoryMemory'
import { ZipCodeRepository } from '../src/application/repository/ZipCodeRepository'
import { Connection } from '../src/infra/database/Connection'
import { Mysql2Adapter } from '../src/infra/database/Mysql2Adapter'
import { ZipCodeRepositoryDatabase } from '../src/infra/repository/ZipCodeRepositoryDatabase'
import { Dimension } from '../src/domain/entity/Dimension'
let itemRepository: ItemRepository
let couponRepository: CouponRepository
let connection: Connection
let zipCodeRepository: ZipCodeRepository
beforeEach(async () => {
  connection = new Mysql2Adapter()
  zipCodeRepository = new ZipCodeRepositoryDatabase(connection)
  itemRepository = new ItemRepositoryMemory()
  couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20))
})
test('Deve simular um pedido', async () => {
  itemRepository.save(new Item(1, 'Guitarra', 1000))
  itemRepository.save(new Item(2, 'Amplificador', 5000))
  itemRepository.save(new Item(3, 'Cabo', 30))
  const preview = new Preview(
    itemRepository,
    couponRepository,
    zipCodeRepository,
  )
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
  }
  const result = await preview.execute(input)
  expect(result).toBe(6090)
})
test('Deve simular um pedido com desconto', async () => {
  itemRepository.save(new Item(1, 'Guitarra', 1000))
  itemRepository.save(new Item(2, 'Amplificador', 5000))
  itemRepository.save(new Item(3, 'Cabo', 30))
  const preview = new Preview(
    itemRepository,
    couponRepository,
    zipCodeRepository,
  )
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: 'VALE20',
  }
  const result = await preview.execute(input)
  expect(result).toBe(4872)
})
test('Deve simular um pedido com distância', async () => {
  itemRepository.save(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)),
  )
  const preview = new Preview(
    itemRepository,
    couponRepository,
    zipCodeRepository,
  )
  const input = {
    cpf: '987.654.321-00',
    orderItems: [{ idItem: 1, quantity: 1 }],
    from: '88015600',
    to: '22060030',
  }
  const result = await preview.execute(input)
  expect(result).toBe(1022.45)
})
