export class Cpf {
  constructor(private value: string) {
    if (!this.validate(value)) throw new Error('Cpf inválido')
  }

  private validate(cpfRaw: any) {
    if (!cpfRaw) return false
    const cpf = this.cleanCpf(cpfRaw)
    if (!this.isValidLength(cpf)) return false
    if (this.hasAllDigitsEqual(cpf)) return false
    const firstDigit = this.calculateDigit(cpf, 10)
    const secondDigit = this.calculateDigit(cpf, 11)
    const checkDigit = this.extractDigit(cpf)
    const calculatedDigit = `${firstDigit}${secondDigit}`
    return checkDigit === calculatedDigit
  }

  private cleanCpf(cpf: any) {
    return cpf.replace(/\D/g, '')
  }

  private isValidLength(cpf: string) {
    return cpf.length === 11
  }

  private hasAllDigitsEqual(cpf: string) {
    return cpf.split('').every((c: string) => c === cpf[0])
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0
    for (const digit of cpf) {
      if (factor > 1) total += Number(digit) * factor--
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
  }

  private extractDigit(cpf: string) {
    return cpf.slice(-2)
  }

  getValue(): string {
    return this.value
  }
}
