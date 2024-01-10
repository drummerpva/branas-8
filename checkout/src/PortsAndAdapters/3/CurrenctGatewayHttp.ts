import axios from 'axios'

export class CurrencyGatewayHttp {
  async getCurrency() {
    const { data: currency } = await axios.get(
      'http://localhost:3001/currencies',
    )
    return currency.amount
  }
}
