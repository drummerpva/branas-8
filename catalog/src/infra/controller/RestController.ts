import { GetItem } from '../../application/usecase/GetItem'
import { HttpServer } from '../http/HttpServer'

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getItem: GetItem,
  ) {
    httpServer.on('get', '/items/:idItem', async (params: any) => {
      const item = await getItem.execute(params.idItem)
      return item
    })
  }
}
