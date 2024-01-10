import { ZipCode } from '../../domain/entity/ZipCode'

export interface ZipCodeRepository {
  save(zipCode: ZipCode): Promise<void>
  getByCode(code: string): Promise<ZipCode>
}
