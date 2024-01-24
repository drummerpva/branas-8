export class Observer {
  constructor(
    readonly event: string,
    readonly callback: (data?: any) => void,
  ) {}
}
