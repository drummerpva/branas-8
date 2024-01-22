import { HttpClient } from '@/infra/HttpClient'
import { CheckoutGateway } from './CheckoutGateway'

export class CheckoutHttpGateway implements CheckoutGateway {
  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string,
  ) {}

  async preview(order: any): Promise<any> {
    const { total } = await this.httpClient.post(
      `${this.baseUrl}/preview`,
      order,
    )
    return total
  }

  async checkout(order: any): Promise<void> {
    await this.httpClient.post(`${this.baseUrl}/checkout`, order)
  }

  async validateCoupon(code: string): Promise<boolean> {
    const { valid } = await this.httpClient.post(
      `${this.baseUrl}/validateCoupon`,
      {
        code,
      },
    )
    return valid
  }

  async getOrdersByCpf(cpf: string): Promise<any> {
    const orders = await this.httpClient.get(`${this.baseUrl}/orders/${cpf}`)
    return orders
  }
}
