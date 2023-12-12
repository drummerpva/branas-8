import { Ride } from '../../../src/calculateRide/v3/Ride'

test('Deve calcular uma corrida em horário normal', () => {
  const ride = new Ride()
  ride.addSegment(10, new Date('2021-03-10T10:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(21)
})
test('Deve calcular uma corrida em horário noturno', () => {
  const ride = new Ride()
  ride.addSegment(10, new Date('2021-03-10T22:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(39)
})
test('Deve calcular uma corrida em horário normal no domingo', () => {
  const ride = new Ride()
  ride.addSegment(10, new Date('2021-03-07T10:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(29)
})
test('Deve calcular uma corrida em horário noturno no domingo', () => {
  const ride = new Ride()
  ride.addSegment(10, new Date('2021-03-07T22:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(50)
})
test('Deve calcular uma corrida com valor minimo', () => {
  const ride = new Ride()
  ride.addSegment(1, new Date('2021-03-10T10:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(10)
})
test('Deve lançar erro se a distancia for inválida', () => {
  const ride = new Ride()
  expect(() =>
    ride.addSegment(0, new Date('2021-03-10T10:00:00')),
  ).toThrowError('Invalid distance')
})
test('Deve lançar erro se a data for inválida', () => {
  const ride = new Ride()
  expect(() =>
    // @ts-expect-error Invalid date
    ride.addSegment(1, '2021-03-10T10:00:00'),
  ).toThrowError('Invalid date')
})
