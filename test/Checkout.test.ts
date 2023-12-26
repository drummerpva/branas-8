import { ItemRepositoryMemory } from '../src/infra/repository/ItemRepositoryMemory'
import { OrderRepositoryMemory } from '../src/infra/repository/OrderRepositoryMemory'
import { Checkout } from '../src/application/usecase/Checkout'
import { GetOrderByCpf } from '../src/application/usecase/GetOrderByCpf'
import { Item } from '../src/domain/entity/Item'
import { CouponRepositoryMemory } from '../src/infra/repository/CouponRepositoryMemory'
import { Coupon } from '../src/domain/entity/Coupon'
import { ItemRepository } from '../src/application/repository/ItemRepository'
import { OrderRepository } from '../src/application/repository/OrderRepository'
import { CouponRepository } from '../src/application/repository/CouponRepository'

let itemRepository: ItemRepository
let orderRepository: OrderRepository
let couponRepository: CouponRepository

beforeEach(async () => {
  itemRepository = new ItemRepositoryMemory()
  orderRepository = new OrderRepositoryMemory()
  couponRepository = new CouponRepositoryMemory()
  itemRepository.save(new Item(1, 'Guitarra', 1000))
  itemRepository.save(new Item(2, 'Amplificador', 5000))
  itemRepository.save(new Item(3, 'Cabo', 30))
  couponRepository.save(new Coupon('VALE20', 20))
})

test('Deve fazer o pedido', async () => {
  const orderSaveSpy = vi.spyOn(OrderRepositoryMemory.prototype, 'save')

  const checkout = new Checkout(
    itemRepository,
    orderRepository,
    couponRepository,
  )
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
  }
  await checkout.execute(input)
  expect(orderSaveSpy).toHaveBeenCalledOnce()
  const getOrdersByCpf = new GetOrderByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute(input.cpf)
  expect(orders.length).toBe(1)
  expect(orders[0].total).toBe(6090)
})

test('Deve fazer o pedido com desconto', async () => {
  const orderSaveSpy = vi.spyOn(OrderRepositoryMemory.prototype, 'save')
  const checkout = new Checkout(
    itemRepository,
    orderRepository,
    couponRepository,
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
  await checkout.execute(input)
  expect(orderSaveSpy).toHaveBeenCalledOnce()
  const getOrdersByCpf = new GetOrderByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute(input.cpf)
  expect(orders.length).toBe(1)
  expect(orders[0].total).toBe(4872)
  vi.restoreAllMocks()
})
