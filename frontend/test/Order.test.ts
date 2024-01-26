import { Item } from '@/entities/Item'
import { Order } from '@/entities/Order'

test('Deve criar um pedido', async () => {
  const order = new Order('98765432100')
  order.addItem(new Item(1, 'Guitarra', 1000))
  order.addItem(new Item(1, 'Guitarra', 1000))
  order.addItem(new Item(1, 'Guitarra', 1000))
  expect(order.orderItems.length).toBe(1)
  expect(order.orderItems[0].quantity).toBe(3)
})
