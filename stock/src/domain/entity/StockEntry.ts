export class StockEntry {
  constructor(
    readonly idItem: number,
    readonly operation: 'in' | 'out',
    readonly quantity: number,
  ) {}
}
