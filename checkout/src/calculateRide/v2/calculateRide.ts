const OVERNIGH_FARE = 3.9
const OVERNIGH_SUNDAY_FARE = 5.0
const SUNDAY_FARE = 2.9
const NORMAL_FARE = 2.1
const OVERNIGHT_START = 22
const OVERNIGHT_END = 6
const MIN_FARE = 10

const isOvernight = (date: Date) => {
  return date.getHours() >= OVERNIGHT_START || date.getHours() <= OVERNIGHT_END
}
const isSunday = (date: Date) => {
  return date.getDay() === 0
}
const isValidDistance = (distance: number) => {
  return distance && typeof distance === 'number' && distance > 0
}
const isValidDate = (date: Date) => {
  return date && date instanceof Date && date.toString() !== 'Invalid Date'
}
type Segment = {
  distance: number
  date: Date
}
export function calculareRide(segments: Segment[]) {
  let fare = 0
  for (const segment of segments) {
    if (!isValidDistance(segment.distance)) throw new Error('Invalid distance')
    if (!isValidDate(segment.date)) throw new Error('Invalid date')
    if (isOvernight(segment.date) && isSunday(segment.date)) {
      fare += segment.distance * OVERNIGH_SUNDAY_FARE
    }
    if (isOvernight(segment.date) && !isSunday(segment.date)) {
      fare += segment.distance * OVERNIGH_FARE
    }
    if (!isOvernight(segment.date) && isSunday(segment.date)) {
      fare += segment.distance * SUNDAY_FARE
    }
    if (!isOvernight(segment.date) && !isSunday(segment.date)) {
      fare += segment.distance * NORMAL_FARE
    }
  }
  return fare < MIN_FARE ? MIN_FARE : fare
}
