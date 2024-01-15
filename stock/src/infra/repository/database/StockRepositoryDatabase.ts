import { StockRepository } from '../../../application/repository/StockRepository'
import { StockEntry } from '../../../domain/entity/StockEntry'
import { Connection } from '../../database/Connection'

export class StockRepositoryDatabase implements StockRepository {
  constructor(readonly connection: Connection) {}

  async getStockEntries(idItem: number): Promise<StockEntry[]> {
    const stockEntriesData = await this.connection.query(
      `SELECT * FROM stock_entry WHERE id_item = ?`,
      [idItem],
    )
    const stockEntries: StockEntry[] = []
    for (const stockEntryData of stockEntriesData) {
      stockEntries.push(
        new StockEntry(
          stockEntryData.id_item,
          stockEntryData.operation,
          stockEntryData.quantity,
        ),
      )
    }
    return stockEntries
  }

  async save(stockEntry: StockEntry): Promise<void> {
    await this.connection.query(
      `INSERT INTO stock_entry(id_item, operation, quantity) VALUES (?, ?, ?)`,
      [stockEntry.idItem, stockEntry.operation, stockEntry.quantity],
    )
  }
}
