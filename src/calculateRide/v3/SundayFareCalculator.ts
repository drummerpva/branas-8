import { FareCalculator } from './FareCalculator'
import { Segment } from './Segment'

export class SundayFareCalculator implements FareCalculator {
  FARE = 2.9
  calculate(segment: Segment): number {
    return segment.distance * this.FARE
  }
}
