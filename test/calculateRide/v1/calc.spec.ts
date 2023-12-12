import { calc } from '../../../src/calculateRide/v1/calc'

test('Deve calcular uma corrida em horário normal', () => {
  const fare = calc([{ dist: 10, ds: new Date('2021-03-10T10:00:00') }])
  expect(fare).toBe(21)
})
test('Deve calcular uma corrida em horário noturno', () => {
  const fare = calc([{ dist: 10, ds: new Date('2021-03-10T22:00:00') }])
  expect(fare).toBe(39)
})
test('Deve calcular uma corrida em horário normal no domingo', () => {
  const fare = calc([{ dist: 10, ds: new Date('2021-03-07T10:00:00') }])
  expect(fare).toBe(29)
})
test('Deve calcular uma corrida em horário noturno no domingo', () => {
  const fare = calc([{ dist: 10, ds: new Date('2021-03-07T22:00:00') }])
  expect(fare).toBe(50)
})
test('Deve calcular uma corrida com valor minimo', () => {
  const fare = calc([{ dist: 1, ds: new Date('2021-03-10T10:00:00') }])
  expect(fare).toBe(10)
})
test('Deve retornar -1 se a distancia for inválida', () => {
  const fare = calc([{ dist: 0, ds: new Date('2021-03-10T10:00:00') }])
  expect(fare).toBe(-1)
})
test('Deve retornar -2 se a data for inválida', () => {
  const fare = calc([{ dist: 1, ds: '2021-03-10T10:00:00' }])
  expect(fare).toBe(-2)
})
