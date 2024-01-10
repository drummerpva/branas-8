import axios from 'axios'

test('Deve testar o simulateFreight pela Api', async () => {
  const input = {
    orderItems: [{ volume: 0.03, density: 100, quantity: 1 }],
  }
  const { data } = await axios.post(
    'http://localhost:3001/calculateFreight',
    input,
  )
  expect(data.freight).toBe(30)
})
