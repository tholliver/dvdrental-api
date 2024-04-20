import { customerSchema, paymentSchema } from '../db/schema'
import { Router, Request, Response, NextFunction } from 'express'
import dbConn from '../db/dbConn'
import { avg, eq, sql, count, sum } from 'drizzle-orm'
import {
  GetAllPaymentsByDate,
  GetSummaryCustomerPayments,
} from '../db/repository/payments-repo'
// import { NotFoundError } from '../middleware/error-types'

const paymentRouter = Router()

class PaymentController {
  static async getPayements(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = dbConn.query.paymentSchema.findMany()
      //   if (!payments) return NotFoundError('no payments')

      return res.status(200).send(payments)
    } catch (err) {
      next(err)
    }
  }

  static async getCutomerTotalPayments(req: Request, res: Response, next: NextFunction) {
    try {
      // const customer
    } catch (error) {
      next(error)
    }
  }

  static async getPayementsByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await GetAllPaymentsByDate()
      res.json(payments)
    } catch (error) {
      next(error)
    }
  }

  static async getCustomerPayment(req: Request<{ customerId: number }>, res: Response, next: NextFunction) {
    try {
      // const customerPayemnt = await dbConn.query.customerSchema.findMany({
      //   where: eq(customerSchema.customer_id, req.params.userId),
      //   with: {
      //     payments: true,
      //     rentals: true,
      //   },
      // })

      const customerPayemnt = await dbConn
        .select({
          amout: paymentSchema.amount,
          userName: customerSchema.first_name,
          userLastName: customerSchema.last_name,
        })
        .from(customerSchema)
        .where(eq(customerSchema.customer_id, req.params.customerId))
        .innerJoin(
          paymentSchema,
          eq(customerSchema.customer_id, paymentSchema.customer_id)
        )

      const [avgCustomerPayment] = await GetSummaryCustomerPayments(
        req.params.customerId
      )

      return res.json(avgCustomerPayment)
    } catch (error) {
      next(error)
    }
  }
}

paymentRouter.get('/', PaymentController.getPayements)
paymentRouter.get('/date-pays', PaymentController.getPayementsByDate)
paymentRouter.get('/customer/:customerId', PaymentController.getCustomerPayment)

export default paymentRouter
