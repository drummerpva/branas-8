import { Purchase } from './Purchase'

export class Invoice {
  purchases: Purchase[]
  constructor(readonly currencyAmount: number) {
    this.purchases = []
  }

  setPurchases(purchases: Purchase[]) {
    this.purchases = purchases
  }

  getTotal() {
    let total = 0
    for (const purchase of this.purchases as any[]) {
      if (purchase.currency === 'USD') {
        total += purchase.amount * this.currencyAmount
        continue
      }
      total += purchase.amount
    }
    return total
  }
}
