import { CouponRepository } from '../src/application/repository/CouponRepository'
import { ValidateCoupon } from '../src/application/usecase/ValidateCoupon'
import { Coupon } from '../src/domain/entity/Coupon'
import { CouponRepositoryMemory } from '../src/infra/repository/CouponRepositoryMemory'

let couponRepository: CouponRepository

beforeEach(async () => {
  couponRepository = new CouponRepositoryMemory()
})

test('Deve validar um cupom de desconto', async () => {
  couponRepository.save(
    new Coupon('VALE20', 20, new Date('2021-10-10T10:00:00')),
  )
  const sut = new ValidateCoupon(couponRepository)
  const input = {
    code: 'VALE20',
    date: new Date('2021-10-10T09:00:00'),
  }
  const isValid = await sut.execute(input)
  expect(isValid).toBe(true)
})
