import { CalculateFreight } from '../../application/usecase/CalculateFreight'
import { HttpServer } from '../http/HttpServer'

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly calculateFreight: CalculateFreight,
  ) {
    httpServer.on(
      'post',
      '/calculateFreight',
      async (params: any, body: any) => {
        const freight = await calculateFreight.execute(body)
        return { freight }
      },
    )
  }
}
