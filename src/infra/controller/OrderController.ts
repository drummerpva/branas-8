import { Checkout } from '../../application/usecase/Checkout'
import { GetOrderByCpf } from '../../application/usecase/GetOrderByCpf'
import { Preview } from '../../application/usecase/Preview'
import { HttpServer } from '../http/HttpServer'

export class OrderController {
  constructor(
    readonly httpServer: HttpServer,
    readonly preview: Preview,
    readonly checkout: Checkout,
    readonly getOrderByCpf: GetOrderByCpf,
  ) {
    httpServer.on('post', '/preview', async (params: any, body: any) => {
      const total = await preview.execute(body)
      return { total }
    })
    httpServer.on('post', '/checkout', async (params: any, body: any) => {
      await checkout.execute(body)
    })
    httpServer.on('get', '/orders/:cpf', async (params: any) => {
      const orders = await getOrderByCpf.execute(params.cpf)
      return orders
    })
  }
}
