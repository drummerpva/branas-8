import { ItemRepositoryMemory } from '../src/infra/repository/ItemRepositoryMemory'
import { Preview } from '../src/application/usecase/Preview'
import { Item } from '../src/domain/entity/Item'

test('Deve simular um pedido', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 'Guitarra', 1000))
  itemRepository.save(new Item(2, 'Amplificador', 5000))
  itemRepository.save(new Item(3, 'Cabo', 30))
  const preview = new Preview(itemRepository)
  const input = {
    cpf: '987.654.321-00',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
  }
  const result = await preview.execute(input)
  expect(result).toBe(6090)
})
