import { Coupon } from '../../domain/entity/Coupon'

export interface CouponRepository {
  save(coupon: Coupon): Promise<void>
  getCoupon(code: string): Promise<Coupon | undefined>
}
