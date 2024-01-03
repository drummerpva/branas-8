import { Item } from './Item'

export class FreightCalculator {
  static MIN_FREIGHT = 10
  static DEFAULT_DISTANCE = 1000

  static calculate(item: Item, distance: number = this.DEFAULT_DISTANCE) {
    const freight = item.getVolume() * distance * (item.getDensity() / 100)
    if (freight > 0 && freight < FreightCalculator.MIN_FREIGHT) {
      return FreightCalculator.MIN_FREIGHT
    }
    return Number(freight.toFixed(2))
  }
}
