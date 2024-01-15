import { StockEntry } from '../../domain/entity/StockEntry'

export interface StockRepository {
  getStockEntries(idItem: number): Promise<StockEntry[]>
  save(stockEntry: StockEntry): Promise<void>
}
