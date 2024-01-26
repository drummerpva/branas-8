import { Order } from '@/entities/Order'
import { Button } from './ui/button'
import { Input } from './ui/input'

type OrderComponentProps = {
  order: Order
  total: number
  handleChange: (event: any) => void
  validateCoupon: (coupon: string) => void
  handleCheckout: (orderToCheckout: Order) => void
}

export function OrderComponent({
  order,
  total,
  handleChange,
  validateCoupon,
  handleCheckout,
}: OrderComponentProps) {
  return (
    <>
      <h2 className="text-2xl mt-4">Order</h2>
      <p>
        CPF: <Input value={order.cpf} className="max-w-48" />
      </p>
      <p>
        Coupon:{' '}
        <Input
          value={order.coupon}
          placeholder="Coupon"
          className="max-w-48"
          name="coupon"
          onChange={handleChange}
          onBlur={({ target: { value } }) => validateCoupon(value)}
        />
      </p>
      <p>Items:</p>
      {order.orderItems.map((item: any) => (
        <p key={item.idItem} className="mb-2">
          idItem: {item.idItem} - quantity: {item.quantity}{' '}
          <Button variant="destructive" onClick={() => order.removeItem(item)}>
            -
          </Button>
        </p>
      ))}
      <p>
        Total: <strong>{total}</strong>
      </p>
      <Button variant="secondary" onClick={() => handleCheckout(order)}>
        Checkout
      </Button>
    </>
  )
}
