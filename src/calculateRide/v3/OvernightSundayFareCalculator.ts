import { FareCalculator } from './FareCalculator'
import { Segment } from './Segment'

export class OvernightSundayFareCalculator implements FareCalculator {
  FARE = 5.0
  calculate(segment: Segment): number {
    return segment.distance * this.FARE
  }
}
