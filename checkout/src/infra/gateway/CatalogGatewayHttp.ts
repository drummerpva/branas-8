import axios from 'axios'
import { CatalogGateway } from '../../application/gateway/CatalogGateway'
import { Item } from '../../domain/entity/Item'
import { Dimension } from '../../domain/entity/Dimension'

export class CatalogGatewayHttp implements CatalogGateway {
  async getItem(idItem: number): Promise<Item> {
    const { data: itemData } = await axios.get(
      `http://localhost:3002/items/${idItem}`,
    )
    return new Item(
      itemData.idItem,
      itemData.description,
      itemData.price,
      new Dimension(
        itemData.height,
        itemData.width,
        itemData.length,
        itemData.weight,
      ),
    )
  }
}
