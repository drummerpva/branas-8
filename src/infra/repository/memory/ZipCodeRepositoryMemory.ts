import { ZipCodeRepository } from '../../../application/repository/ZipCodeRepository'
import { ZipCode } from '../../../domain/entity/ZipCode'

export class ZipCodeRepositoryMemory implements ZipCodeRepository {
  private zipCodes: ZipCode[] = []

  async save(zipCode: ZipCode): Promise<void> {
    this.zipCodes.push(zipCode)
  }

  async getByCode(code: string): Promise<ZipCode> {
    const zipCode = this.zipCodes.find((zipCode) => zipCode.code === code)
    if (!zipCode) {
      throw new Error('Zip code not found')
    }
    return zipCode
  }
}
