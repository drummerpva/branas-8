import { CouponRepository } from '../../../application/repository/CouponRepository'
import { Coupon } from '../../../domain/entity/Coupon'
import { Connection } from '../../database/Connection'

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) {}
  async save(coupon: Coupon): Promise<void> {
    await this.connection.query(
      'INSERT INTO coupons(code,percentage,expire_date) VALUES(?,?,?)',
      [coupon.code, coupon.percentage, coupon.expirationDate],
    )
  }

  async getCoupon(code: string): Promise<Coupon | undefined> {
    const [couponData] = await this.connection.query(
      'SELECT * FROM coupons WHERE code = ?',
      [code],
    )
    if (!couponData) return undefined
    return new Coupon(
      couponData.code,
      couponData.percentage,
      couponData.expire_date,
    )
  }
}
