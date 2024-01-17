import { Checkout } from '../src/application/usecase/Checkout'
import { GetOrderByCpf } from '../src/application/usecase/GetOrderByCpf'
import { Item } from '../src/domain/entity/Item'
import { Coupon } from '../src/domain/entity/Coupon'
import { ItemRepository } from '../src/application/repository/ItemRepository'
import { OrderRepository } from '../src/application/repository/OrderRepository'
import { CouponRepository } from '../src/application/repository/CouponRepository'
import { Dimension } from '../src/domain/entity/Dimension'
import { RepositoryFactory } from '../src/domain/factory/RepositoryFactory'
import { RepositoyFactoryMemory } from '../src/infra/factory/RepositoryFactoryMemory'
import { RepositoryFactoryDatabase } from '../src/infra/factory/RepositoryFactoryDatabase'
import { Connection } from '../src/infra/database/Connection'
import { Mysql2Adapter } from '../src/infra/database/Mysql2Adapter'
import { OrderRepositoryDatabase } from '../src/infra/repository/database/OrderRepositoryDatabase'
import { DecrementStockGateway } from '../src/application/gateway/DecrementStockGateway'
import { DecrementStockGatewayHttp } from '../src/infra/gateway/DecrementStockGatewayHttp'
import { Queue } from '../src/infra/queue/Queue'
import { RabbitMQAdapter } from '../src/infra/queue/RabbitMQAdapter'

let itemRepository: ItemRepository
let orderRepository: OrderRepository
let couponRepository: CouponRepository
let repositoryFactory: RepositoryFactory
let connection: Connection
let decrementStockGateway: DecrementStockGateway
let checkout: Checkout
let queue: Queue

beforeEach(async () => {
  // repositoryFactory = new RepositoyFactoryMemory()
  connection = new Mysql2Adapter()
  repositoryFactory = new RepositoryFactoryDatabase(connection)
  itemRepository = repositoryFactory.createItemRepository()
  orderRepository = repositoryFactory.createOrderRepository()
  couponRepository = repositoryFactory.createCouponRepository()
  decrementStockGateway = new DecrementStockGatewayHttp()
  queue = new RabbitMQAdapter()
  await queue.connect()
  // itemRepository.save(new Item(1, 'Guitarra', 1000))
  // itemRepository.save(new Item(2, 'Amplificador', 5000))
  // itemRepository.save(new Item(3, 'Cabo', 30))
  // couponRepository.save(new Coupon('VALE20', 20))
  checkout = new Checkout(repositoryFactory, decrementStockGateway, queue)
  await connection.query('DELETE FROM order_item', [])
  await connection.query('DELETE FROM orders', [])
  await connection.query('DELETE FROM coupons', [])
})
afterEach(async () => {
  await queue.close()
})

test('Deve fazer o pedido', async () => {
  const orderSaveSpy = vi.spyOn(OrderRepositoryDatabase.prototype, 'save')

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
  expect(orders.length).toBeGreaterThanOrEqual(1)
  expect(orders[0].total).toBe(6370)
})
test('Deve fazer o pedido com desconto', async () => {
  const orderSaveSpy = vi.spyOn(OrderRepositoryDatabase.prototype, 'save')
  couponRepository.save(new Coupon('VALE20', 20))
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
  expect(orders[0].total).toBe(5152)
  vi.restoreAllMocks()
})
test('Deve fazer o pedido com desconto expirado', async () => {
  const orderSaveSpy = vi.spyOn(OrderRepositoryDatabase.prototype, 'save')
  couponRepository.save(
    new Coupon('VALE20_INVALID', 20, new Date('2021-03-01T10:00:00')),
  )
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: 'VALE20_INVALID',
    date: new Date('2021-03-01T11:00:00'),
  }
  await checkout.execute(input)
  expect(orderSaveSpy).toHaveBeenCalledOnce()
  const getOrdersByCpf = new GetOrderByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute(input.cpf)
  expect(orders.length).toBe(1)
  expect(orders[0].total).toBe(6370)
  vi.restoreAllMocks()
})
test('Deve fazer o pedido com desconto válido', async () => {
  const orderSaveSpy = vi.spyOn(OrderRepositoryDatabase.prototype, 'save')
  couponRepository.save(
    new Coupon('VALE20_VALID', 20, new Date('2021-03-01T10:00:00')),
  )
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: 'VALE20_VALID',
    date: new Date('2021-03-01T09:00:00'),
  }
  await checkout.execute(input)
  expect(orderSaveSpy).toHaveBeenCalledOnce()
  const getOrdersByCpf = new GetOrderByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute(input.cpf)
  expect(orders.length).toBe(1)
  expect(orders[0].total).toBe(5152)
  vi.restoreAllMocks()
})
test('Deve fazer o pedido com frete', async () => {
  const repositoryFactoryMemory = new RepositoyFactoryMemory()
  const itemRepositoryStub = repositoryFactoryMemory.createItemRepository()
  const orderRepository = repositoryFactoryMemory.createOrderRepository()
  itemRepositoryStub.save(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)),
  )
  itemRepositoryStub.save(new Item(2, 'Amplificador', 5000))
  itemRepositoryStub.save(new Item(3, 'Cabo', 30))
  const checkoutLocal = new Checkout(
    repositoryFactoryMemory,
    decrementStockGateway,
    queue,
  )
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
  }
  await checkoutLocal.execute(input)
  const getOrdersByCpf = new GetOrderByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute(input.cpf)
  expect(orders.length).toBe(1)
  expect(orders[0].total).toBe(6120)
})
test('Deve fazer o pedido com código', async () => {
  const itemRepository = repositoryFactory.createItemRepository()
  const orderRepository = repositoryFactory.createOrderRepository()
  itemRepository.save(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)),
  )
  const input = {
    cpf: '987.654.321-00',
    orderItems: [{ idItem: 1, quantity: 1 }],
    date: new Date('2021-03-01T10:00:00'),
  }
  await checkout.execute(input)
  await checkout.execute(input)
  const getOrdersByCpf = new GetOrderByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute(input.cpf)
  expect(orders.length).toBe(2)
  expect(orders[0].code).toBe('202100000001')
  expect(orders[1].code).toBe('202100000002')
})
