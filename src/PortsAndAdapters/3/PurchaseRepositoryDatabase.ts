import mysql from 'mysql2/promise'
import { Purchase } from './Purchase'
import { PurchaseRepository } from './PurchaseRepository'

export class PurchaseRepositoryDatabase implements PurchaseRepository {
  async getPurchase(
    cardNumber: string,
    month: number,
    year: number,
  ): Promise<Purchase[]> {
    const connection = mysql.createPool(
      'mysql://root:root@localhost:3306/branas8',
    )
    const [purchasesData] = await connection.query(
      `SELECT * FROM purchase WHERE card_number = ? AND MONTH(date) = ? AND YEAR(date) = ?`,
      [cardNumber, month, year],
    )
    return (purchasesData as any[]).map(
      (purchaseData) =>
        new Purchase(
          purchaseData.card_number,
          Number(purchaseData.amount),
          purchaseData.currency,
        ),
    )
  }
}
