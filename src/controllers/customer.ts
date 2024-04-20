import { Router, Request, Response, NextFunction } from 'express'
import { eq } from 'drizzle-orm'
import { customerSchema } from '../db/schema'
import dbConn from '../db/dbConn'

import {
  GetCustomerPayemnts,
  GetSummaryCustomerPayments
} from '../db/repository/payments-repo'

const customerRouter = Router()

class CustomerController {
  static async getAll(req: Request, res: Response) {
    const resutls = await dbConn.select().from(customerSchema).execute()

    res.status(200).send(resutls)
  }

  static async getCustomer(req: Request<{ id: number }>, res: Response) {
    const customerFound = await dbConn.query.customerSchema.findFirst({
      where: (customerSchema, { eq }) =>
        eq(customerSchema.customer_id, req.params.id),
      with: { address: true },
    })
    const [avgCustomerPayment] = await GetSummaryCustomerPayments(req.params.id)

    if (customerFound && avgCustomerPayment)
      return res
        .status(200)
        .send({ userInfo: customerFound, paymentsSummary: avgCustomerPayment })

    return res.send({ message: 'User not found' })
  }
}

customerRouter.get('/:id', CustomerController.getCustomer)
customerRouter.get('/', CustomerController.getAll)

export default customerRouter
