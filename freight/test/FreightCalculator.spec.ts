import { FreightCalculator } from '../src/domain/entity/FreightCalculator'

test('Deve calcular o frete', () => {
  // width: 100cm, height: 30cm, length: 10cm, weight: 3kg
  const freight = FreightCalculator.calculate(0.03, 100)
  expect(freight).toBe(30)
})
test('Deve calcular o frete mínimo', () => {
  // width: 100cm, height: 30cm, length: 10cm, weight: 3kg
  const freight = FreightCalculator.calculate(0.001, 900)
  expect(freight).toBe(10)
})
test('Deve calcular o frete com distancia', () => {
  // width: 100cm, height: 30cm, length: 10cm, weight: 3kg
  const distance = 748.22
  const freight = FreightCalculator.calculate(0.03, 100, distance)
  expect(freight).toBe(22.45)
})
