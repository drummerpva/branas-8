import axios from 'axios'

test('Deve testar o preview pela api', async () => {
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
  }
  const { data } = await axios.post('http://localhost:3000/preview', input)
  expect(data.total).toBe(6370)
})
test('Deve testar o preview com desconto pela api', async () => {
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: 'VALE20',
  }
  const { data } = await axios.post('http://localhost:3000/preview', input)
  expect(data.total).toBe(5152)
})
test('Deve testar o simulateFreight pela Api', async () => {
  const input = {
    orderItems: [{ idItem: 1, quantity: 1 }],
  }
  const { data } = await axios.post(
    'http://localhost:3000/simulateFreight',
    input,
  )
  expect(data.freight).toBe(30)
})
test('Deve testar o validateCoupon pela Api', async () => {
  const input = {
    code: 'VALE20',
    date: new Date(),
  }
  const { data } = await axios.post(
    'http://localhost:3000/validateCoupon',
    input,
  )
  expect(data.valid).toBe(true)
})
