import { StockCalculator } from '../src/domain/entity/StockCalculator'
import { StockEntry } from '../src/domain/entity/StockEntry'

test('Deve calcular o estoque de um item', async () => {
  const stockEntries = [
    new StockEntry(1, 'in', 10),
    new StockEntry(1, 'in', 10),
    new StockEntry(1, 'out', 5),
  ]
  const total = StockCalculator.calculate(stockEntries)
  expect(total).toBe(15)
})