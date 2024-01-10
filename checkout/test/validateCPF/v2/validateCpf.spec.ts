import { validate } from '../../../src/validateCPF/v2/validate'

test.each(['259.556.978-37'])(
  'Deve validar o cpf que tem dígito maior que 0',
  (cpf: string) => {
    const isValid = validate(cpf)
    expect(isValid).toBe(true)
  },
)
test.each(['98765432100', '12345678909'])(
  'Deve validar o cpf com dígito zero no primeiro digito',
  (cpf: string) => {
    const isValid = validate(cpf)
    expect(isValid).toBe(true)
  },
)
test.each(['98765432100'])(
  'Deve validar o cpf com dígito zero no segundo digito',
  (cpf: string) => {
    const isValid = validate(cpf)
    expect(isValid).toBe(true)
  },
)
test.each(['147.085.437-600'])(
  'Deve retornar false quando o cpf tiver mais de 14 caracteres',
  (cpf: string) => {
    const isValid = validate(cpf)
    expect(isValid).toBe(false)
  },
)
test.each([null, undefined])('Deve tentar valida o cpf null', (cpf: any) => {
  const isValid = validate(cpf)
  expect(isValid).toBe(false)
})
test.each([
  '111.111.111-11',
  '222.222.222-22',
  '444.444.444-44',
  '555.555.555-55',
  '666.666.666-66',
  '777.777.777-77',
  '888.888.888-88',
  '999.999.999-99',
  '000.000.000-00',
])('Deve tentar valida o cpf com caracteres repetidos', (cpf: string) => {
  const isValid = validate(cpf)
  expect(isValid).toBe(false)
})
