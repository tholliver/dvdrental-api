import express from 'express'
import cors from 'cors'
import rentalRouter from './controllers/rental'
import userRouter from './controllers/users'
import categoryRouter from './controllers/category'
import storeRouter from './controllers/store'
import customerRouter from './controllers/customer'
import staffRouter from './controllers/staff'
import filmRouter from './controllers/film'
import statsRouter from './controllers/stats'
import paymentRouter from './controllers/payment'

const app = express()
app.use(cors())

app.use('/users', userRouter)
app.use('/stores', storeRouter)
app.use('/categories', categoryRouter)
app.use('/customers', customerRouter)
app.use('/staff', staffRouter)
app.use('/films', filmRouter)
app.use('/payments', paymentRouter)
app.use('/rentals', rentalRouter)
app.use('/stats', statsRouter)

app.get('/', (_req, res, _next) => {
    return res.send({ message: 'hello' })
})

export default app