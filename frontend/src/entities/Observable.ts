import { Observer } from './Observer'

export class Observable {
  observers: Observer[]
  constructor() {
    this.observers = []
  }

  register(oberver: Observer) {
    this.observers.push(oberver)
  }

  notify(event: string, data?: any) {
    for (const oberver of this.observers) {
      if (oberver.event === event) {
        oberver.callback(data)
      }
    }
  }
}
