export class OrderCode {
  private value: string
  constructor(date: Date, sequence: number) {
    this.value = this.generate(date, sequence)
  }

  private generate(date: Date, sequence: number) {
    const year = date.getFullYear()
    return `${year}${String(sequence).padStart(8, '0')}`
  }

  getCode() {
    return this.value
  }
}
