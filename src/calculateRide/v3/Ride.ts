import { Segment } from './Segment'

export class Ride {
  OVERNIGH_FARE = 3.9
  OVERNIGH_SUNDAY_FARE = 5.0
  SUNDAY_FARE = 2.9
  NORMAL_FARE = 2.1
  OVERNIGHT_START = 22
  OVERNIGHT_END = 6
  MIN_FARE = 10
  private segments: Segment[]
  constructor() {
    this.segments = []
  }

  addSegment(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date))
  }

  calculateFare() {
    let fare = 0
    for (const segment of this.segments) {
      if (segment.isOvernight() && segment.isSunday()) {
        fare += segment.distance * this.OVERNIGH_SUNDAY_FARE
      }
      if (segment.isOvernight() && !segment.isSunday()) {
        fare += segment.distance * this.OVERNIGH_FARE
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        fare += segment.distance * this.SUNDAY_FARE
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        fare += segment.distance * this.NORMAL_FARE
      }
    }
    return fare < this.MIN_FARE ? this.MIN_FARE : fare
  }
}
