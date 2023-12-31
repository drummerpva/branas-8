import { FareCalculator } from './FareCalculator'
import { NormalFareCalculator } from './NormalFareCalculator'
import { OvernightFareCalculator } from './OvernighFareCalculator'
import { OvernightSundayFareCalculator } from './OvernightSundayFareCalculator'
import { Segment } from './Segment'
import { SundayFareCalculator } from './SundayFareCalculator'

export class FareCalculatorFactory {
  static create(segment: Segment): FareCalculator {
    if (segment.isOvernight() && segment.isSunday()) {
      return new OvernightSundayFareCalculator()
    }
    if (segment.isOvernight() && !segment.isSunday()) {
      return new OvernightFareCalculator()
    }
    if (!segment.isOvernight() && segment.isSunday()) {
      return new SundayFareCalculator()
    }
    if (!segment.isOvernight() && !segment.isSunday()) {
      return new NormalFareCalculator()
    }
    throw new Error('Unknown segment type')
  }
}
