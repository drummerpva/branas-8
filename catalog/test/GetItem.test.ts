import { GetItem } from '../src/application/usecase/GetItem'
import { Dimension } from '../src/domain/entity/Dimension'
import { Item } from '../src/domain/entity/Item'
import { ItemRepositoryMemory } from '../src/infra/repository/memory/ItemRepositoryMemory'

test('Deve obter o item', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)),
  )
  const getItem = new GetItem(itemRepository)
  const item = await getItem.execute(1)
  expect(item.idItem).toBe(1)
  expect(item.price).toBe(1000)
  expect(item.volume).toBe(0.03)
  expect(item.density).toBe(100)
  expect(item.width).toBe(100)
  expect(item.height).toBe(30)
  expect(item.length).toBe(10)
  expect(item.weight).toBe(3)
  expect(item.description).toBe('Guitarra')
})
