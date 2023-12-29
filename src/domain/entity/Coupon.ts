export class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate?: Date,
  ) {}

  calculateDiscount(total: number, date: Date = new Date()) {
    if (this.expirationDate && this.expirationDate.getTime() < date.getTime())
      return 0
    return (total * this.percentage) / 100
  }

  isExpired(date: Date = new Date()) {
    if (!this.expirationDate) return false
    return this.expirationDate.getTime() < date.getTime()
  }
}
