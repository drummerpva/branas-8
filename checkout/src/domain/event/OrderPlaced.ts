import { Order } from '../entity/Order'
import { DomainEvent } from './DomainEvent'

export class OrderPlaced implements DomainEvent {
  name = 'orderPlaced'
  constructor(readonly order: Order) {}
}
