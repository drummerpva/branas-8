export interface CheckoutGateway {
  preview(order: any): Promise<any>
  checkout(order: any): Promise<void>
  validateCoupon(code: string): Promise<boolean>
  getOrdersByCpf(cpf: string): Promise<any>
}
