'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
  const [items, setItems] = useState<any[]>()
  const [orders, setOrders] = useState<any[]>()
  const [order, setOrder] = useState<any>({
    orderItems: [],
    cpf: '98765432100',
    coupon: '',
    total: 0,
  })

  useEffect(() => {
    const onLoad = async () => {
      const { data } = await axios.get('http://localhost:3002/items')
      setItems(data)
    }
    onLoad()
  }, [])
  const handlePreview = useCallback(async (orderToPreview: any) => {
    const {
      data: { total },
    } = await axios.post('http://localhost:3000/preview', orderToPreview)
    setOrder((oldOrder: any) => ({ ...oldOrder, total }))
  }, [])
  const getOrdersByCpf = useCallback(async (cpf: string) => {
    setOrders([])
    const { data: orders } = await axios.get(
      `http://localhost:3000/orders/${cpf}`,
    )
    setOrders(orders)
  }, [])
  const handleCheckout = useCallback(
    async (orderToCheckout: any) => {
      await axios.post('http://localhost:3000/checkout', orderToCheckout)
      setOrder((oldOrder: any) => ({
        ...oldOrder,
        orderItems: [],
        total: 0,
        coupon: '',
      }))
      await getOrdersByCpf(orderToCheckout.cpf)
    },
    [getOrdersByCpf],
  )

  const addItem = useCallback(
    (item: any) => {
      setOrder((prev: any) => {
        const newOrder = {
          ...prev,
          orderItems: !prev.orderItems.some(
            (orderItem: any) => orderItem.idItem === item.idItem,
          )
            ? [...prev.orderItems, { idItem: item.idItem, quantity: 1 }]
            : prev.orderItems.map((orderItem: any) => {
                if (orderItem.idItem === item.idItem)
                  return { ...orderItem, quantity: orderItem.quantity + 1 }
                return orderItem
              }),
        }
        handlePreview(newOrder)
        return newOrder
      })
    },
    [handlePreview],
  )

  const removerOrderItem = useCallback(
    (item: any) => {
      setOrder((prev: any) => {
        const newOrder = {
          ...prev,
          orderItems: prev.orderItems
            .map((orderItem: any) => {
              if (orderItem.idItem === item.idItem)
                return { ...orderItem, quantity: orderItem.quantity - 1 }
              return orderItem
            })
            .filter((orderItem: any) => orderItem.quantity > 0),
        }
        handlePreview(newOrder)
        return newOrder
      })
    },
    [handlePreview],
  )

  const handleChange = useCallback((event: any) => {
    const { name, value } = event.target
    setOrder((oldOrder: any) => ({ ...oldOrder, [name]: value?.toUpperCase() }))
  }, [])

  const validateCoupon = useCallback(
    async (value: string) => {
      if (!value) return
      setOrder((oldOrder: any) => {
        const newOrder = { ...oldOrder, coupon: '' }
        handlePreview(newOrder)
        return newOrder
      })
      const {
        data: { valid },
      } = await axios.post('http://localhost:3000/validateCoupon', {
        code: value,
      })
      if (valid) {
        setOrder((oldOrder: any) => {
          const newOrder = { ...oldOrder, coupon: value }
          handlePreview(newOrder)
          return newOrder
        })
      }
    },
    [handlePreview],
  )

  return (
    <>
      <h1 className="text-2xl">Checkout</h1>
      {items?.map((item) => (
        <p key={item.idItem} className="text-xl">
          {item.description} - {item.price}
          <Button className="ml-4" onClick={() => addItem(item)}>
            Add
          </Button>
        </p>
      ))}

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
          <Button variant="destructive" onClick={() => removerOrderItem(item)}>
            -
          </Button>
        </p>
      ))}
      <p>
        Total: <strong>{order.total}</strong>
      </p>
      <Button variant="secondary" onClick={() => handleCheckout(order)}>
        Checkout
      </Button>
      <hr />
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => getOrdersByCpf(order.cpf)}
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
