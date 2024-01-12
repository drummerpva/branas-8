import { ItemRepository } from '../repository/ItemRepository'

export class GetItem {
  constructor(readonly itemRepository: ItemRepository) {}

  async execute(idItem: number): Promise<Outuput> {
    const item = await this.itemRepository.getItem(idItem)
    return {
      idItem: item.idItem,
      description: item.description,
      price: item.price,
      volume: item.getVolume(),
      density: item.getDensity(),
    }
  }
}

type Outuput = {
  idItem: number
  description: string
  price: number
  volume: number
  density: number
}
