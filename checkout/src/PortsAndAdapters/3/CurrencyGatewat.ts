export interface CurrencyGateway {
  getCurrency(): Promise<number>
}
