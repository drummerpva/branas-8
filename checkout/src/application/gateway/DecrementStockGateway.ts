export interface DecrementStockGateway {
  execute(idItem: number, quantity: number): Promise<void>
}
