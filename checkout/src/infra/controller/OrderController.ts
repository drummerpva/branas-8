import { Checkout } from '../../application/usecase/Checkout'
import { GetOrderByCpf } from '../../application/usecase/GetOrderByCpf'
import { Preview } from '../../application/usecase/Preview'
import { SimulateFreight } from '../../application/usecase/SimulateFreight'
import { ValidateCoupon } from '../../application/usecase/ValidateCoupon'
import { HttpServer } from '../http/HttpServer'

export class OrderController {
  constructor(
    readonly httpServer: HttpServer,
    readonly preview: Preview,
    readonly checkout: Checkout,
    readonly getOrderByCpf: GetOrderByCpf,
    readonly simulateFreight: SimulateFreight,
    readonly validateCoupon: ValidateCoupon,
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
    httpServer.on(
      'post',
      '/simulateFreight',
      async (params: any, body: any) => {
        const freight = await simulateFreight.execute(body)
        return { freight }
      },
    )
    httpServer.on('post', '/validateCoupon', async (params: any, body: any) => {
      const valid = await validateCoupon.execute(body)
      return { valid }
    })
  }
}
