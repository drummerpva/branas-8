import { ItemRepositoryMemory } from '../src/infra/repository/ItemRepositoryMemory'
import { Preview } from '../src/application/usecase/Preview'
import { Item } from '../src/domain/entity/Item'
import { CouponRepository } from '../src/application/repository/CouponRepository'
import { ItemRepository } from '../src/application/repository/ItemRepository'
import { Coupon } from '../src/domain/entity/Coupon'
import { CouponRepositoryMemory } from '../src/infra/repository/CouponRepositoryMemory'
let itemRepository: ItemRepository
let couponRepository: CouponRepository
beforeEach(async () => {
  itemRepository = new ItemRepositoryMemory()
  couponRepository = new CouponRepositoryMemory()
  itemRepository.save(new Item(1, 'Guitarra', 1000))
  itemRepository.save(new Item(2, 'Amplificador', 5000))
  itemRepository.save(new Item(3, 'Cabo', 30))
  couponRepository.save(new Coupon('VALE20', 20))
})
test('Deve simular um pedido', async () => {
  const preview = new Preview(itemRepository, couponRepository)
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
  const preview = new Preview(itemRepository, couponRepository)
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
