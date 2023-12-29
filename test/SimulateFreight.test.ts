import { ItemRepository } from '../src/application/repository/ItemRepository'
import { SimulateFreight } from '../src/application/usecase/SimulateFreight'
import { Dimension } from '../src/domain/entity/Dimension'
import { Item } from '../src/domain/entity/Item'
import { ItemRepositoryMemory } from '../src/infra/repository/ItemRepositoryMemory'

let itemRepository: ItemRepository
beforeEach(async () => {
  itemRepository = new ItemRepositoryMemory()
})
test('Deve simular o frete', async () => {
  itemRepository.save(
    new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)),
  )
  const input = {
    orderItems: [{ idItem: 1, quantity: 1 }],
  }
  const sut = new SimulateFreight(itemRepository)
  const freight = await sut.execute(input)
  expect(freight).toBe(30)
})
