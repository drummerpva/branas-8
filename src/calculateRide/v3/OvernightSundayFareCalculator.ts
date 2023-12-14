import { FareCalculator } from './FareCalculator'
import { Segment } from './Segment'

export class OvernightSundayFareCalculator implements FareCalculator {
  FARE = 5.0
  next?: FareCalculator
  constructor(next?: FareCalculator) {
    this.next = next
  }

  calculate(segment: Segment): number {
    if (segment.isOvernight() && segment.isSunday()) {
      return segment.distance * this.FARE
    }
    if (!this.next) throw new Error('No next calculator')
    return this.next.calculate(segment)
  }
}
