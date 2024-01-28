import { Connection } from '../../infra/database/Connection'

export class GetOrderByCpfQuery {
  constructor(readonly connection: Connection) {}

  async execute(cpf: string): Promise<Output[]> {
    const getOrdersByCpfDTO = await this.connection.query(
      `SELECT * FROM item 
      JOIN order_item ON item.id = order_item.id_item 
      JOIN orders USING(id_order)
      WHERE orders.cpf = ?
      `,
      [cpf],
    )
    return getOrdersByCpfDTO
  }
}

type Output = {
  total: number
  code: string
  orderItems: {
    idItem: number
    quantity: number
    description: string
    price: number
  }[]
}
