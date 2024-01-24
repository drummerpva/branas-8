import { HttpClient } from '@/infra/HttpClient'
import { CatalogGateway } from './CatalogGateway'
import { Item } from '@/entities/Item'

export class CatalogHttpGateway implements CatalogGateway {
  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string,
  ) {}

  async getItems(): Promise<Item[]> {
    const itemsData = await this.httpClient.get(`${this.baseUrl}/items`)
    const items: Item[] = []
    for (const itemData of itemsData) {
      items.push(
        new Item(itemData.idItem, itemData.description, itemData.price),
      )
    }
    return items
  }
}
