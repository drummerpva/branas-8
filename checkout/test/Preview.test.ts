import { ItemRepositoryMemory } from '../src/infra/repository/memory/ItemRepositoryMemory'
import { Preview } from '../src/application/usecase/Preview'
import { Item } from '../src/domain/entity/Item'
import { CouponRepository } from '../src/application/repository/CouponRepository'
import { ItemRepository } from '../src/application/repository/ItemRepository'
import { Coupon } from '../src/domain/entity/Coupon'
import { CouponRepositoryMemory } from '../src/infra/repository/memory/CouponRepositoryMemory'
import { Dimension } from '../src/domain/entity/Dimension'
import { CalculateFreightGateway } from '../src/application/gateway/CalculateFreightGateway'
let itemRepository: ItemRepository
let couponRepository: CouponRepository
let calculateFreightGateway: CalculateFreightGateway
beforeEach(async () => {
  itemRepository = new ItemRepositoryMemory()
  couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20))
  calculateFreightGateway = {
    calculate: vi.fn().mockResolvedValue(0),
  }
  // calculateFreightGateway = new CalculateFreightGatewayHttp()
})
test('Deve simular um pedido', async () => {
  itemRepository.save(new Item(1, 'Guitarra', 1000))
  itemRepository.save(new Item(2, 'Amplificador', 5000))
  itemRepository.save(new Item(3, 'Cabo', 30))
  const preview = new Preview(
    itemRepository,
    couponRepository,
    calculateFreightGateway,
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
    calculateFreightGateway,
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
  calculateFreightGateway = {
    calculate: vi.fn().mockResolvedValue(22.45),
  }
  itemRepository.save(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)),
  )
  const preview = new Preview(
    itemRepository,
    couponRepository,
    calculateFreightGateway,
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
