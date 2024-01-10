import { Dimension } from '../src/domain/entity/Dimension'

test('Deve calcular o volume', () => {
  const dimension = new Dimension(100, 30, 10, 3)
  expect(dimension.getVolume()).toBe(0.03)
})
test('Deve calcular a densidade', () => {
  const dimension = new Dimension(100, 30, 10, 3)
  expect(dimension.getDensity()).toBe(100)
})
test('Não deve criar uma dimensão invalida', () => {
  expect(() => new Dimension(-100, 30, 10, 3)).toThrowError('Invalid dimension')
  expect(() => new Dimension(100, -30, 10, 3)).toThrowError('Invalid dimension')
  expect(() => new Dimension(100, 30, -10, 3)).toThrowError('Invalid dimension')
  expect(() => new Dimension(100, 30, 10, -3)).toThrowError('Invalid dimension')
})
