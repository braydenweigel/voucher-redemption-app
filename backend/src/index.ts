import express from 'express'
import morgan from 'morgan'
import router from './router/index.js'


const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(express.json())
app.use('/', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})