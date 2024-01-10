import axios from 'axios'

test.skip('Deve testar a API de invoice', async () => {
  const { data } = await axios.get(
    'http://localhost:3000/cards/1234123412341234/invoices',
  )
  expect(data.total).toBe(690)
})
