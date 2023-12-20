import express from 'express'
const app = express()

app.get('/currencies', async (req, res) => {
  res.json({
    amount: 3,
  })
})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
