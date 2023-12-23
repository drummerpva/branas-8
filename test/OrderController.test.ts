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
  expect(data.total).toBe(6090)
})
