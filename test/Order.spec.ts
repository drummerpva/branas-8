import { Coupon } from '../src/domain/entity/Coupon'
import { Dimension } from '../src/domain/entity/Dimension'
import { Item } from '../src/domain/entity/Item'
import { Order } from '../src/domain/entity/Order'

test('Não deve criar um pedido com CPF inválido', () => {
  expect(() => new Order('111.111.111-11')).toThrowError('Cpf inválido')
})

test('Deve criar um pedido sem itens', () => {
  const order = new Order('987.654.321-00')
  const total = order.getTotal()
  expect(total).toBe(0)
})
test('Deve criar um pedido com 3 itens', () => {
  const order = new Order('987.654.321-00')
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Cabo', 30), 3)
  const total = order.getTotal()
  expect(total).toBe(6090)
})
test('Deve criar um pedido com 3 itens com cupom de desconto', () => {
  const order = new Order('987.654.321-00')
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Cabo', 30), 3)
  order.addCoupon(new Coupon('VALE20', 20))
  const total = order.getTotal()
  expect(total).toBe(4872)
})
test('Deve criar um pedido com 3 itens com cupom de desconto expirado', () => {
  const order = new Order('987.654.321-00', new Date('2021-03-02T10:00:00'))
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Cabo', 30), 3)
  order.addCoupon(new Coupon('VALE20', 20, new Date('2021-03-01T10:00:00')))
  const total = order.getTotal()
  expect(total).toBe(6090)
})
test('Deve criar um pedido com 3 itens com cupom de desconto válido', () => {
  const order = new Order('987.654.321-00', new Date('2021-03-02T10:00:00'))
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Cabo', 30), 3)
  order.addCoupon(new Coupon('VALE20', 20, new Date('2021-03-02T11:00:00')))
  const total = order.getTotal()
  expect(total).toBe(4872)
})
test('Não deve criar um pedido com quantidade negativa', () => {
  const order = new Order('987.654.321-00')
  expect(() => order.addItem(new Item(1, 'Guitarra', 1000), -1)).toThrowError(
    'Invalid quantity',
  )
})
test('Não deve criar um pedido com o mesmo item', () => {
  const order = new Order('987.654.321-00')
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  expect(() => order.addItem(new Item(1, 'Guitarra', 1000), -1)).toThrowError(
    'Duplicated item',
  )
})
test('Deve criar um pedido com código', () => {
  const order = new Order('987.654.321-00', new Date('2021-03-10T10:00:00'))
  order.addItem(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)), 1)
  expect(order.getCode()).toBe('202100000001')
})
