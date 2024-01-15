import { StockRepository } from '../../../application/repository/StockRepository'
import { StockEntry } from '../../../domain/entity/StockEntry'

export class StockRepositoryMemory implements StockRepository {
  stockEntries: StockEntry[]
  constructor() {
    this.stockEntries = []
  }

  async getStockEntries(idItem: number): Promise<StockEntry[]> {
    return this.stockEntries.filter(
      (stockEntry) => stockEntry.idItem === idItem,
    )
  }

  async save(stockEntry: StockEntry): Promise<void> {
    this.stockEntries.push(stockEntry)
  }
}
