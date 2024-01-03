import { ZipCodeRepository } from '../../application/repository/ZipCodeRepository'
import { Coord } from '../../domain/entity/Coord'
import { ZipCode } from '../../domain/entity/ZipCode'
import { Connection } from '../database/Connection'

export class ZipCodeRepositoryDatabase implements ZipCodeRepository {
  constructor(readonly connection: Connection) {}
  async save(zipCode: ZipCode): Promise<void> {
    await this.connection.query(
      'INSERT INTO zipcode(code, street,neighborhood,lat,lng) VALUES(?,?,?,?,?)',
      [
        zipCode.code,
        zipCode.street,
        zipCode.neighborhood,
        zipCode.coordinate.lat,
        zipCode.coordinate.lng,
      ],
    )
  }

  async getByCode(code: string): Promise<ZipCode> {
    const [zipCodeData] = await this.connection.query(
      `SELECT * FROM zipcode WHERE code = ? LIMIT 1`,
      [code],
    )
    if (!zipCodeData) {
      throw new Error('Zip code not found')
    }
    return new ZipCode(
      zipCodeData.code,
      zipCodeData.street,
      zipCodeData.neighborhood,
      new Coord(Number(zipCodeData.lat), Number(zipCodeData.lng)),
    )
  }
}
