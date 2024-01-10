import axios from 'axios'
import express from 'express'
import mysql from 'mysql2/promise'
const app = express()
// driver
app.get('/cards/:cardNumber/invoices', async (req, res) => {
  const date = new Date('2022-09-10T10:00:00')
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  // driven
  const connection = mysql.createPool(
    'mysql://root:root@localhost:3306/branas8',
  )
  const [purchases] = await connection.query(
    `SELECT * FROM purchase WHERE card_number = ? AND MONTH(date) = ? AND YEAR(date) = ?`,
    [req.params.cardNumber, month, year],
  )
  let total = 0
  const { data: currency } = await axios.get('http://localhost:3001/currencies')
  // application
  for (const purchase of purchases as any[]) {
    if (purchase.currency === 'USD') {
      total += Number(purchase.amount) * currency.amount
      continue
    }
    total += Number(purchase.amount)
  }
  res.json({
    total,
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
