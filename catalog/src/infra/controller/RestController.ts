import { GetItem } from '../../application/usecase/GetItem'
import { GetItems } from '../../application/usecase/GetItems'
import { HttpServer } from '../http/HttpServer'

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getItem: GetItem,
    readonly getItems: GetItems,
  ) {
    httpServer.on('get', '/items/:idItem', async (params: any) => {
      const item = await getItem.execute(params.idItem)
      return item
    })
    httpServer.on('get', '/items', async () => {
      const items = await getItems.execute()
      return items
    })
  }
}
