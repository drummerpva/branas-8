import { CouponRepository } from '../../../application/repository/CouponRepository'
import { Coupon } from '../../../domain/entity/Coupon'

export class CouponRepositoryMemory implements CouponRepository {
  counpons: Coupon[]
  constructor() {
    this.counpons = []
  }

  async save(coupon: Coupon): Promise<void> {
    this.counpons.push(coupon)
  }

  async getCoupon(code: string): Promise<Coupon | undefined> {
    return this.counpons.find((coupon) => coupon.code === code)
  }
}
