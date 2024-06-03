import dbConn from '../dbConn'
import { eq, sum, count, sql } from 'drizzle-orm'
import {
  customerSchema,
  inventorySchema,
  paymentSchema,
  rentalSchema,
  filmSchema,
} from '../schema'
import { GroupByType } from '../../typos'
import { getGroupByKey } from '../../utils/repo-utils'

export const GetCustomerPayemnts = async (userId: number) => {
  return await dbConn
    .select({
      amout: paymentSchema.amount,
      userName: customerSchema.first_name,
      userLastName: customerSchema.last_name,
    })
    .from(customerSchema)
    .where(eq(customerSchema.customer_id, userId))
    .innerJoin(
      paymentSchema,
      eq(customerSchema.customer_id, paymentSchema.customer_id)
    )
}

export const GetAllPaymentsByDate = async (by: string) => {
  const groupBy = getGroupByKey(by as keyof GroupByType)

  return await dbConn.execute(
    sql.raw(`select TO_CHAR(DATE_TRUNC('${groupBy.spec}', payment_date),
                    '${groupBy.format}') AS date,
                     sum(amount) as daytotal
            from payment
            group by DATE_TRUNC('${groupBy.spec}', payment_date)
            order by date
            limit 7`)
  )
  // [FIX] -> 
  // PostgresError: column "payment.payment_date" must appear in the GROUP BY clause or be used in an aggregate function
  // return await dbConn
  //   .select({
  //     date: sql`TO_CHAR(DATE_TRUNC('${groupBy.spec}', ${paymentSchema.payment_date}), '${groupBy.format}') AS date_only`,
  //     dayTotal: sum(paymentSchema.amount),
  //   })
  //   .from(paymentSchema)
  //   .groupBy(sql`DATE_TRUNC('${groupBy.spec}',${paymentSchema.payment_date})`)
  //   .orderBy(sql`DATE_TRUNC('${groupBy.spec}',${paymentSchema.payment_date})`)
}

export const GetSummaryCustomerPayments = async (customerId: number) => {
  return await dbConn
    .select({
      userName: customerSchema.first_name,
      userLastName: customerSchema.last_name,
      averagePayment:
        sql`round(cast(avg(${paymentSchema.amount}) as numeric), 2)`.mapWith(
          Number
        ),
      count: count(customerSchema.customer_id),
      totalSpend:
        sql`round(cast(sum(${paymentSchema.amount}) as numeric), 2)`.mapWith(
          Number
        ),
    })
    .from(customerSchema)
    .where(eq(customerSchema.customer_id, customerId))
    .leftJoin(
      rentalSchema,
      eq(rentalSchema.customer_id, customerSchema.customer_id)
    )
    .rightJoin(
      paymentSchema,
      eq(rentalSchema.rental_id, paymentSchema.rental_id)
    )
    .groupBy(customerSchema.first_name, customerSchema.last_name)
    .limit(1)
}

export const GetPayments = async (customerId: number) => {
}