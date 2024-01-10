import { Coord } from './Coord'

export class DistanceCalculator {
  static calculate(from: Coord, to: Coord): number {
    if (from.lat === to.lat && from.lng === to.lng) return 0
    const radLat1 = (Math.PI * from.lat) / 180
    const radLat2 = (Math.PI * to.lat) / 180
    const theta = from.lng - to.lng
    const radTheta = (Math.PI * theta) / 180
    let distance =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta)
    distance = distance > 1 ? 1 : distance
    distance = Math.acos(distance)
    distance = (distance * 180) / Math.PI
    distance = distance * 60 * 1.1515
    distance = distance * 1.609344
    return Number(distance.toFixed(2))
  }
}
