import { Item } from './Item'

export abstract class TaxItem extends Item {
  abstract calculateTax(): number
}
