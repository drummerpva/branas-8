import axios from 'axios'
import { Connection } from '../src/infra/database/Connection'
import { Mysql2Adapter } from '../src/infra/database/Mysql2Adapter'

let connection: Connection
beforeEach(async () => {
  connection = new Mysql2Adapter()
  await connection.query(`DELETE FROM stock_entry`, [])
})

test('Deve decrementar estoque pela API', async () => {
  const input = {
    idItem: 1,
    quantity: 10,
  }
  await axios.post('http://localhost:3003/decrementStock', input)
  const { data: output } = await axios.get('http://localhost:3003/getStock/1')

  expect(output.total).toBe(-10)
})
