import { Item } from '@/entities/Item'
import { Button } from './ui/button'

type ItemComponentProps = {
  item: Item
  handleAdd: (itemToAdd: Item) => void
}

export function ItemComponent({ item, handleAdd }: ItemComponentProps) {
  return (
    <p className="text-xl">
      {item.description} - {item.price}
      <Button className="ml-4" onClick={() => handleAdd(item)}>
        Add
      </Button>
    </p>
  )
}
