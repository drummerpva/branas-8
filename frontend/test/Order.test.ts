import { Item } from '@/entities/Item'
import { Observer } from '@/entities/Observer'
import { Order } from '@/entities/Order'

test('Deve criar um pedido', async () => {
  const order = new Order('98765432100')
  order.addItem(new Item(1, 'Guitarra', 1000))
  order.addItem(new Item(1, 'Guitarra', 1000))
  order.addItem(new Item(1, 'Guitarra', 1000))
  expect(order.orderItems.length).toBe(1)
  expect(order.orderItems[0].quantity).toBe(3)
  order.removeItem(order.orderItems[0])
  expect(order.orderItems[0].quantity).toBe(2)
})
test('Deve criar um pedido e lançar eventos', async () => {
  const order = new Order('98765432100')
  const addItemEvents: any[] = []
  const removeItemEvents: any[] = []
  order.register(
    new Observer('addOrderItem', () => {
      addItemEvents.push({})
    }),
  )
  order.register(
    new Observer('removeOrderItem', () => {
      removeItemEvents.push({})
    }),
  )
  order.addItem(new Item(1, 'Guitarra', 1000))
  order.addItem(new Item(1, 'Guitarra', 1000))
  order.addItem(new Item(1, 'Guitarra', 1000))
  expect(order.orderItems.length).toBe(1)
  expect(order.orderItems[0].quantity).toBe(3)
  order.removeItem(order.orderItems[0])
  expect(order.orderItems[0].quantity).toBe(2)
  expect(addItemEvents).toHaveLength(3)
  expect(removeItemEvents).toHaveLength(1)
})
