import { DistanceCalculator } from '../../domain/entity/DistanceCalculator'
import { FreightCalculator } from '../../domain/entity/FreightCalculator'
import { ItemRepository } from '../repository/ItemRepository'
import { ZipCodeRepository } from '../repository/ZipCodeRepository'

export class SimulateFreight {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly zipCodeRepository: ZipCodeRepository,
  ) {}

  async execute(input: Input): Promise<number> {
    let freight = 0
    let distance
    if (input.from && input.to) {
      const from = await this.zipCodeRepository.getByCode(input.from)
      const to = await this.zipCodeRepository.getByCode(input.to)
      distance = DistanceCalculator.calculate(from.coordinate, to.coordinate)
    }
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      freight +=
        FreightCalculator.calculate(item, distance) * orderItem.quantity
    }
    return freight
  }
}

type Input = {
  orderItems: {
    idItem: number
    quantity: number
  }[]
  from?: string
  to?: string
}
