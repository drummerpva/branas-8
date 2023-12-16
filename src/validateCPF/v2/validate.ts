function cleanCpf(cpf: any) {
  return cpf.replace(/\D/g, '')
}
function hasAllDigitsEqual(cpf: string) {
  return cpf.split('').every((c: string) => c === cpf[0])
}
function isValidLength(cpf: string) {
  return cpf.length === 11
}
function extractDigit(cpf: string) {
  return cpf.slice(-2)
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0
  for (const digit of cpf) {
    if (factor > 1) total += Number(digit) * factor--
  }
  const rest = total % 11
  return rest < 2 ? 0 : 11 - rest
}

export function validate(cpfRaw: any) {
  if (!cpfRaw) return false
  const cpf = cleanCpf(cpfRaw)
  if (!isValidLength(cpf)) return false
  if (hasAllDigitsEqual(cpf)) return false
  const firstDigit = calculateDigit(cpf, 10)
  const secondDigit = calculateDigit(cpf, 11)
  const checkDigit = extractDigit(cpf)
  const calculatedDigit = `${firstDigit}${secondDigit}`
  return checkDigit === calculatedDigit
}
