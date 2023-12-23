import { ItemRepositoryMemory } from '../src/infra/repository/ItemRepositoryMemory'
import { OrderRepositoryMemory } from '../src/infra/repository/OrderRepositoryMemory'
import { Checkout } from '../src/application/usecase/Checkout'
import { GetOrderByCpf } from '../src/application/usecase/GetOrderByCpf'
import { Item } from '../src/domain/entity/Item'

test('Deve fazer o pedido', async () => {
  const itemRepository = new ItemRepositoryMemory()
  const orderRepository = new OrderRepositoryMemory()
  const orderSaveSpy = vi.spyOn(OrderRepositoryMemory.prototype, 'save')
  itemRepository.save(new Item(1, 'Guitarra', 1000))
  itemRepository.save(new Item(2, 'Amplificador', 5000))
  itemRepository.save(new Item(3, 'Cabo', 30))
  const checkout = new Checkout(itemRepository, orderRepository)
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
