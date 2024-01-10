import { Coord } from './Coord'

export class ZipCode {
  constructor(
    readonly code: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly coordinate: Coord,
  ) {}
}
