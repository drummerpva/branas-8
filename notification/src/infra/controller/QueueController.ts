import { NotifyCustomer } from '../../application/usecase/NotifyCustomer'
import { Queue } from '../queue/Queue'

export class QueueController {
  constructor(
    readonly queue: Queue,
    readonly notifyCustomer: NotifyCustomer,
  ) {
    queue.on(
      'orderPlaced',
      'orderPlaced.notifyCustomer',
      async (message: any) => {
        console.log(message.code.value)
        await this.notifyCustomer.execute()
      },
    )
  }
}
