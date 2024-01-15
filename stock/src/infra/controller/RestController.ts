import { DecrementStock } from '../../application/usecase/DecrementStock'
import { GetStock } from '../../application/usecase/GetStock'
import { HttpServer } from '../http/HttpServer'

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly decrementStock: DecrementStock,
    readonly getStock: GetStock,
  ) {
    httpServer.on('post', '/decrementStock', async (params: any, body: any) => {
      await decrementStock.execute(body)
    })
    httpServer.on('get', '/getStock/:idItem', async (params: any) => {
      const calculate = await getStock.execute(params.idItem)
      return {
        total: calculate.total,
      }
    })
  }
}
