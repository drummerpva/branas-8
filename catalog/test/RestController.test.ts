import axios from 'axios'

test('Deve buscar um item pela API', async () => {
  const idItem = 1
  const { data } = await axios.get(`http://localhost:3002/items/${idItem}`)
  expect(data.idItem).toBe(idItem)
  expect(data.price).toBe(1000)
})
