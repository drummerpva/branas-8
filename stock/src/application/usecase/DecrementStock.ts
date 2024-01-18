import { StockEntry } from '../../domain/entity/StockEntry'
import { StockRepository } from '../repository/StockRepository'

export class DecrementStock {
  constructor(readonly stockRepository: StockRepository) {}
  async execute(input: Input[]): Promise<void> {
    for (const item of input) {
      await this.stockRepository.save(
        new StockEntry(item.idItem, 'out', item.quantity),
      )
    }
  }
}

type Input = {
  idItem: number
  quantity: number
}
