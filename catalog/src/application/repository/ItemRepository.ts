import { Item } from '../../domain/entity/Item'

export interface ItemRepository {
  getItem(idItem: number): Promise<Item>
  list(): Promise<Item[]>
  save(item: Item): Promise<void>
}
