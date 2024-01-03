import { Dimension } from '../src/domain/entity/Dimension'
import { FreightCalculator } from '../src/domain/entity/FreightCalculator'
import { Item } from '../src/domain/entity/Item'

test('Deve calcular o frete', () => {
  // width: 100cm, height: 30cm, length: 10cm, weight: 3kg
  const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3))
  const freight = FreightCalculator.calculate(item)
  expect(freight).toBe(30)
})
test('Deve calcular o frete mínimo', () => {
  // width: 100cm, height: 30cm, length: 10cm, weight: 3kg
  const item = new Item(3, 'Cabo', 30, new Dimension(1, 1, 1, 0.9))
  const freight = FreightCalculator.calculate(item)
  expect(freight).toBe(10)
})
test('Deve calcular o frete com distancia', () => {
  // width: 100cm, height: 30cm, length: 10cm, weight: 3kg
  const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3))
  const distance = 748.22
  const freight = FreightCalculator.calculate(item, distance)
  expect(freight).toBe(22.45)
})
