import mysql, { Pool } from 'mysql2/promise'
import { Connection } from './Connection'

export class Mysql2Adapter implements Connection {
  connection: Pool
  constructor() {
    this.connection = mysql.createPool(
      'mysql://root:root@localhost:3306/branas8',
    )
  }

  async query(statement: string, params: any[]): Promise<any> {
    const [result] = await this.connection.query(statement, params)
    return result
  }

  async close(): Promise<void> {
    await this.connection.end()
  }
}
