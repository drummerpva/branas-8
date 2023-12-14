import { Segment } from './Segment'

export interface FareCalculator {
  next?: FareCalculator
  calculate(segment: Segment): number
}
