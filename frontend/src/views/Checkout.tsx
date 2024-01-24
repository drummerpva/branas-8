'use client'
import { useDependecies } from '@/Contexts/Dependencies'
import { ItemComponent } from '@/components/ItemComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Item } from '@/entities/Item'
import { Observer } from '@/entities/Observer'
import { Order } from '@/entities/Order'
import { useCallback, useEffect, useState } from 'react'

export function Checkout() {
  const { catalogGateway, checkoutGateway } = useDependecies()
  const [items, setItems] = useState<Item[]>()
  const [orders, setOrders] = useState<any[]>()
  const [state, setState] = useState<any>({
    order: new Order('98765432100'),
    total: 0,
  })

  const handlePreview = useCallback(
    async (orderToPreview: any) => {
      const total = await checkoutGateway.preview(orderToPreview)
      setState((oldState: any) => ({ ...oldState, total }))
    },
    [checkoutGateway],
  )

  useEffect(() => {
    const onLoad = async () => {
      const items = await catalogGateway.getItems()
      setItems(items)
      state.order.register(new Observer('addOrderItem', handlePreview))
      state.order.register(new Observer('removeOrderItem', handlePreview))
    }
    return () => {
      onLoad()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogGateway, handlePreview])
  const getOrdersByCpf = useCallback(
    async (cpf: string) => {
      setOrders([])
      const orders = await checkoutGateway.getOrdersByCpf(cpf)
      setOrders(orders)
    },
    [checkoutGateway],
  )
  const handleCheckout = useCallback(
    async (orderToCheckout: any) => {
      await checkoutGateway.checkout(orderToCheckout)
      setState((oldOrder: any) => ({
        ...oldOrder,
        order: {
          ...oldOrder.order,
          orderItems: [],
          coupon: '',
        },
        total: 0,
      }))
      await getOrdersByCpf(orderToCheckout.cpf)
    },
    [getOrdersByCpf, checkoutGateway],
  )

  const handleChange = useCallback((event: any) => {
    const { name, value } = event.target
    setState((oldOrder: any) => ({
      ...oldOrder,
      order: {
        ...oldOrder.order,
        [name]: value?.toUpperCase(),
      },
    }))
  }, [])

  const validateCoupon = useCallback(
    async (value: string) => {
      if (!value) return
      state.order.coupon = ''
      handlePreview(state.order)
      const valid = await checkoutGateway.validateCoupon(value)
      if (valid) {
        state.order.coupon = value
        handlePreview(state.order)
      }
    },
    [handlePreview, checkoutGateway, state.order],
  )

  return (
    <>
      <h1 className="text-2xl">Checkout</h1>
      {items?.map((item) => (
        <ItemComponent
          key={item.idItem}
          item={item}
          handleAdd={(itemToAdd: Item) => state.order.addItem(itemToAdd)}
        />
      ))}

      <h2 className="text-2xl mt-4">Order</h2>
      <p>
        CPF: <Input value={state.order.cpf} className="max-w-48" />
      </p>
      <p>
        Coupon:{' '}
        <Input
          value={state.order.coupon}
          placeholder="Coupon"
          className="max-w-48"
          name="coupon"
          onChange={handleChange}
          onBlur={({ target: { value } }) => validateCoupon(value)}
        />
      </p>
      <p>Items:</p>
      {state.order.orderItems.map((item: any) => (
        <p key={item.idItem} className="mb-2">
          idItem: {item.idItem} - quantity: {item.quantity}{' '}
          <Button
            variant="destructive"
            onClick={() => state.order.removeItem(item)}
          >
            -
          </Button>
        </p>
      ))}
      <p>
        Total: <strong>{state.total}</strong>
      </p>
      <Button variant="secondary" onClick={() => handleCheckout(state.order)}>
        Checkout
      </Button>
      <hr />
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => getOrdersByCpf(state.order.cpf)}
      >
        Get Orders
      </Button>
      {!!orders?.length && (
        <>
          <h2 className="text-2xl">Orders</h2>
          {orders.map((order) => (
            <p key={order.code} className="text-xl">
              {order.code} - {order.total}
            </p>
          ))}
        </>
      )}
    </>
  )
}
