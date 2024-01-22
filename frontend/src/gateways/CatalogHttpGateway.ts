import { HttpClient } from '@/infra/HttpClient'
import { CatalogGateway } from './CatalogGateway'

export class CatalogHttpGateway implements CatalogGateway {
  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string,
  ) {}

  async getItems(): Promise<any> {
    const items = await this.httpClient.get(`${this.baseUrl}/items`)
    return items
  }
}
