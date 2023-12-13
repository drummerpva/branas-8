import { Segment } from './Segment'

export interface FareCalculator {
  calculate(segment: Segment): number
}
