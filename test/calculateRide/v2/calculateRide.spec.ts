import { calculareRide } from '../../../src/calculateRide/v2/calculateRide'

test('Deve calcular uma corrida em horário normal', () => {
  const fare = calculareRide([
    { distance: 10, date: new Date('2021-03-10T10:00:00') },
  ])
  expect(fare).toBe(21)
})
test('Deve calcular uma corrida em horário noturno', () => {
  const fare = calculareRide([
    { distance: 10, date: new Date('2021-03-10T22:00:00') },
  ])
  expect(fare).toBe(39)
})
test('Deve calcular uma corrida em horário normal no domingo', () => {
  const fare = calculareRide([
    { distance: 10, date: new Date('2021-03-07T10:00:00') },
  ])
  expect(fare).toBe(29)
})
test('Deve calcular uma corrida em horário noturno no domingo', () => {
  const fare = calculareRide([
    { distance: 10, date: new Date('2021-03-07T22:00:00') },
  ])
  expect(fare).toBe(50)
})
test('Deve calcular uma corrida com valor minimo', () => {
  const fare = calculareRide([
    { distance: 1, date: new Date('2021-03-10T10:00:00') },
  ])
  expect(fare).toBe(10)
})
test('Deve lançar erro se a distancia for inválida', () => {
  expect(() =>
    calculareRide([{ distance: 0, date: new Date('2021-03-10T10:00:00') }]),
  ).toThrowError('Invalid distance')
})
test('Deve lançar erro se a data for inválida', () => {
  expect(() =>
    // @ts-expect-error Invalid date
    calculareRide([{ distance: 1, date: '2021-03-10T10:00:00' }]),
  ).toThrowError('Invalid date')
})
