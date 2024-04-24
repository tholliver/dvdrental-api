import dbConn from '../dbConn'
import { sql, sum, between, desc, eq } from 'drizzle-orm'
import { getGroupByKey, timeLapseConverter } from '../../utils/repo-utils'

import { filmSchema, rentalSchema, inventorySchema, paymentSchema } from '../schema'
import { GroupByType } from '../../typos'

export const GetOneCustomerRentals = async (customerId: number) => {
    return await dbConn
        .select({
            filmName: filmSchema.title,
            rentalDate: rentalSchema.rental_date,
            returnDate: rentalSchema.return_date,
            amountPaid: sql`${paymentSchema.amount}`.mapWith(Number),
        })
        .from(filmSchema)
        .innerJoin(inventorySchema, eq(filmSchema.film_id, inventorySchema.film_id))
        .innerJoin(
            rentalSchema,
            eq(inventorySchema.inventory_id, rentalSchema.inventory_id)
        )
        .innerJoin(
            paymentSchema,
            eq(paymentSchema.rental_id, rentalSchema.rental_id)
        )
        .where(eq(rentalSchema.customer_id, customerId))
}

export const GetTopRentedFilmsTimeLapsed = async (time: string, lapse: number) => {
    const timelapseTyped = timeLapseConverter(time, lapse)
    const queryRes = await dbConn
        .select({
            film_id: filmSchema.film_id,
            filmName: filmSchema.title,
            amountMade: sum(paymentSchema.amount),
            rating: filmSchema.rating,
            rentedTimes: sql`count(${filmSchema.film_id})`,
        })
        .from(filmSchema)
        .innerJoin(inventorySchema, eq(filmSchema.film_id, inventorySchema.film_id))
        .innerJoin(
            rentalSchema,
            eq(inventorySchema.inventory_id, rentalSchema.inventory_id)
        )
        .innerJoin(
            paymentSchema,
            eq(rentalSchema.rental_id, paymentSchema.rental_id)
        )
        .where(
            between(
                rentalSchema.rental_date,
                sql`${timelapseTyped}`,
                sql`CURRENT_DATE`
            )
        )
        .groupBy(filmSchema.film_id)
        .orderBy(desc(sql`count(${filmSchema.film_id})`))

    return queryRes
}

export const GetTopRentedFilms = async () => {
    const queryRes = await dbConn
        .select({
            film_id: filmSchema.film_id,
            filmName: filmSchema.title,
            amountMade: sum(paymentSchema.amount),
            rating: filmSchema.rating,
            rentedTimes: sql`count(${filmSchema.film_id})`,
        })
        .from(filmSchema)
        .innerJoin(inventorySchema, eq(filmSchema.film_id, inventorySchema.film_id))
        .innerJoin(
            rentalSchema,
            eq(inventorySchema.inventory_id, rentalSchema.inventory_id)
        )
        .innerJoin(
            paymentSchema,
            eq(rentalSchema.rental_id, paymentSchema.rental_id)
        )
        .groupBy(filmSchema.film_id)
        .orderBy(desc(sql`count(${filmSchema.film_id})`))

    return queryRes
}

export const GetRentsByDateGroup = async (by: string) => {
    const groupBy = getGroupByKey(by as keyof GroupByType)

    return await dbConn.execute(
        sql.raw(`select TO_CHAR(DATE_TRUNC('${groupBy.spec}', return_date),
                        '${groupBy.format}') AS date,
                         count(*) 
                from rental
                group by DATE_TRUNC('${groupBy.spec}', return_date)
                order by date
                limit 7
                `)
    )
}
