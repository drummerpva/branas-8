import { HttpServer } from './HttpServer'
import Hapi from '@hapi/hapi'

export class HapiAdapter implements HttpServer {
  server: Hapi.Server
  constructor() {
    this.server = Hapi.server({})
  }

  async listen(port: number): Promise<void> {
    this.server.settings.port = port
    console.log(`Server is running at port ${port}`)
    await this.server.start()
  }

  convertUrl(url: string): string {
    return url.replace(/\$/g, '')
  }

  on(method: string, url: string, callback: Function): void {
    this.server.route({
      method,
      path: this.convertUrl(url),
      handler: async (req: any) => {
        const output = await callback(req.params, req.payload)
        return output
      },
    })
  }
}
