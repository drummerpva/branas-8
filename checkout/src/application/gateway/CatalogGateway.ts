import { Item } from '../../domain/entity/Item'

export interface CatalogGateway {
  getItem(idItem: number): Promise<Item>
}
