import { Purchase } from './Purchase'

export interface PurchaseRepository {
  getPurchase(
    cardNumber: string,
    month: number,
    year: number,
  ): Promise<Purchase[]>
}
