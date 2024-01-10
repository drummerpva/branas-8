import { Beer } from '../../src/SOLID/Beer'
import { Gin } from '../../src/SOLID/Gin'
import { Invoice } from '../../src/SOLID/Invoice'
import { Juice } from '../../src/SOLID/Juice'
import { Water } from '../../src/SOLID/Water'
import { Whisky } from '../../src/SOLID/Whisky'

test('Deve criar uma nota fiscal e calcular impostos', async () => {
  const invoice = new Invoice()
  invoice.addItem(new Beer('Heineken 600ml', 10)) // 10% = 1
  invoice.addItem(new Whisky('Jack Daniels 1l', 100)) // 20% = 20
  invoice.addItem(new Water('Crystal 500ml', 5)) // 0% = 0
  invoice.addItem(new Juice('Laranja 330ml', 10)) // 0% = 0
  invoice.addItem(new Gin('Shapire 1l', 200)) // 20% = 40
  const taxes = invoice.calculateTaxes()
  expect(taxes).toBe(61)
})
test('Deve criar uma nota fiscal e calcular total', async () => {
  const invoice = new Invoice()
  invoice.addItem(new Beer('Heineken 600ml', 10))
  invoice.addItem(new Whisky('Jack Daniels 1l', 100))
  invoice.addItem(new Water('Crystal 500ml', 5))
  const total = invoice.calculateTotal()
  expect(total).toBe(115)
})
