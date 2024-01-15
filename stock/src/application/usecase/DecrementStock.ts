import { StockEntry } from '../../domain/entity/StockEntry'
import { StockRepository } from '../repository/StockRepository'

export class DecrementStock {
  constructor(readonly stockRepository: StockRepository) {}
  async execute(input: Input): Promise<void> {
    await this.stockRepository.save(
      new StockEntry(input.idItem, 'out', input.quantity),
    )
  }
}

type Input = {
  idItem: number
  quantity: number
}
