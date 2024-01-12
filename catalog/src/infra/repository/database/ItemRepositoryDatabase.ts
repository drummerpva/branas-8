import { ItemRepository } from '../../../application/repository/ItemRepository'
import { Dimension } from '../../../domain/entity/Dimension'
import { Item } from '../../../domain/entity/Item'
import { Connection } from '../../database/Connection'

export class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async getItem(idItem: number): Promise<Item> {
    const [itemData] = await this.connection.query(
      'SELECT * FROM item WHERE id = ?',
      [idItem],
    )
    const item = new Item(
      itemData.id,
      itemData.nome,
      Number(itemData.valor),
      new Dimension(
        itemData.largura,
        itemData.altura,
        itemData.profundidade,
        itemData.peso,
      ),
    )
    return item
  }

  async save(item: Item): Promise<void> {
    /* await this.connection.query(
      'INSERT INTO item (nome, valor) VALUES (?, ?)',
      [item.description, item.price],
    ) */
  }
}
