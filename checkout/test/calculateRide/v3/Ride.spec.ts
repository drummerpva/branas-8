import { NormalFareCalculator } from '../../../src/calculateRide/v3/NormalFareCalculator'
import { OvernightFareCalculator } from '../../../src/calculateRide/v3/OvernighFareCalculator'
import { OvernightSundayFareCalculator } from '../../../src/calculateRide/v3/OvernightSundayFareCalculator'
import { Ride } from '../../../src/calculateRide/v3/Ride'
import { SundayFareCalculator } from '../../../src/calculateRide/v3/SundayFareCalculator'

let ride: Ride
beforeEach(() => {
  const normalFareCalculator = new NormalFareCalculator()
  const overnightFareCalculator = new OvernightFareCalculator(
    normalFareCalculator,
  )
  const sundayFareCalculator = new SundayFareCalculator(overnightFareCalculator)
  const overnightSundayFareCalculator = new OvernightSundayFareCalculator(
    sundayFareCalculator,
  )
  ride = new Ride(overnightSundayFareCalculator)
})

test('Deve calcular uma corrida em horário normal', () => {
  ride.addSegment(10, new Date('2021-03-10T10:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(21)
})
test('Deve calcular uma corrida em horário noturno', () => {
  ride.addSegment(10, new Date('2021-03-10T22:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(39)
})
test('Deve calcular uma corrida em horário normal no domingo', () => {
  ride.addSegment(10, new Date('2021-03-07T10:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(29)
})
test('Deve calcular uma corrida em horário noturno no domingo', () => {
  ride.addSegment(10, new Date('2021-03-07T22:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(50)
})
test('Deve calcular uma corrida com valor minimo', () => {
  ride.addSegment(1, new Date('2021-03-10T10:00:00'))
  const fare = ride.calculateFare()
  expect(fare).toBe(10)
})
test('Deve lançar erro se a distancia for inválida', () => {
  expect(() =>
    ride.addSegment(0, new Date('2021-03-10T10:00:00')),
  ).toThrowError('Invalid distance')
})
test('Deve lançar erro se a data for inválida', () => {
  expect(() =>
    // @ts-expect-error Invalid date
    ride.addSegment(1, '2021-03-10T10:00:00'),
  ).toThrowError('Invalid date')
})
