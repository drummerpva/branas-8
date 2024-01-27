import React from 'react'
import { ItemComponent } from '@/components/ItemComponent'
import { Item } from '@/entities/Item'
import { findByText, render } from '@testing-library/react'

test('Deve testar o componente item', async () => {
  const item = new Item(1, 'Guitarra', 1000)
  const { container } = render(
    <ItemComponent item={item} handleAdd={vi.fn()} />,
  )
  const description = await findByText(container, 'Guitarra - 1000')
  expect(description).toBeInTheDocument()
})
