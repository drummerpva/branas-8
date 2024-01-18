export interface Queue {
  connect(): Promise<void>
  close(): Promise<void>
  on(
    exchangeName: string,
    queueName: string,
    callback: (message: any) => Promise<void>,
  ): Promise<void>
  publish(exchangeName: string, data: any): Promise<void>
}
