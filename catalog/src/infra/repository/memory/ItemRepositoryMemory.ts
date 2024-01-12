import { ItemRepository } from '../../../application/repository/ItemRepository'
import { Item } from '../../../domain/entity/Item'

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[] = []

  async save(item: Item): Promise<void> {
    this.items.push(item)
  }

  async getItem(idItem: number): Promise<Item> {
    const item = this.items.find((item) => item.idItem === idItem)
    if (!item) throw new Error('Item not found')
    return item
  }
}
