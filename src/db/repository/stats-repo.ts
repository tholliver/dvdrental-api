import dbConn from '../dbConn'
import { sql, count, and, gt, lt, sum } from 'drizzle-orm'
import {
  customerSchema,
  filmSchema,
  inventorySchema,
  paymentSchema,
  rentalSchema,
} from '../schema'

export async function getTotalRentsByDate(startDate: string) {
  let currentDate = new Date().toISOString().slice(0, 10)

  return await dbConn
    .select({
      totalRents: count(rentalSchema.rental_date),
    })
    .from(rentalSchema)
    .where(
      sql`${rentalSchema.last_update}::date BETWEEN ${startDate} AND ${currentDate}`
    )
}

export async function getTotalPaysByDate(startDate: string) {
  let currentDate = new Date().toISOString().slice(0, 10)

  return await dbConn
    .select({ sum: sql`COALESCE(SUM(${paymentSchema.amount}), 0)` })
    .from(paymentSchema)
    .where(
      sql`${paymentSchema.payment_date}::date BETWEEN ${startDate} AND ${currentDate}`
    )
}

export async function unitsOnInventory(startDate: string) {
  let currentDate = new Date().toISOString().slice(0, 10)
  return await dbConn.select({ units: count(inventorySchema.film_id) }).from(inventorySchema)
}

export async function getTotalCustomers() {
  return await dbConn.select({ totalCustomers: count(customerSchema.first_name) }).from(customerSchema)
}

export async function getTotalFilms() {
  return await dbConn.select({ totalFilms: count(filmSchema.title) }).from(filmSchema)
}
