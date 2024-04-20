import { Router, Request, Response, NextFunction } from 'express'
import {
    GetOneCustomerRentals,
    GetRentsByDateGroup,
    GetTopRentedFilms,
    GetTopRentedFilmsTimeLapsed,
} from '../db/repository/rental-repo'


const rentalRouter = Router()

class RentalController {
    static async getCustomerRentals(req: Request<{ customer_id: number }>, res: Response, next: NextFunction) {
        const { customer_id } = req.params
        console.log(customer_id, typeof customer_id)

        try {
            const customerRentals = await GetOneCustomerRentals(Number(customer_id))
            return res.status(200).json(customerRentals)
        } catch (error) {
            console.log('Something happened:', error)
            next(error)
        }
    }

    static async totalTopRentedFilms(req: Request, res: Response, next: NextFunction) {
        const { time, lapse } = req.query
        try {
            if (time && lapse) {
                console.log('Here conditioning', time, 'Lapse: ', lapse)
                const topFilmsRented = await GetTopRentedFilmsTimeLapsed(String(time), Number(lapse))
                return res.status(200).json(topFilmsRented)
            }

            const topFilmsRented = await GetTopRentedFilms()
            return res.status(200).json(topFilmsRented)
        } catch (error) {
            next(error)
        }
    }

    static async rentsPerGroupDate(req: Request, res: Response, next: NextFunction) {
        const { by } = req.query

        try {
            const totalRents = await GetRentsByDateGroup(String(by))
            res.status(200).json(totalRents)
        } catch (error) {
            next(error)
        }
    }

    static async rentVoidRoute(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ msg: 'u are in rentals' })
    }
}
rentalRouter.get('/', RentalController.totalTopRentedFilms)
rentalRouter.get('/totals', RentalController.rentsPerGroupDate)
rentalRouter.get('/:customer_id', RentalController.getCustomerRentals)
// rentalRouter.get('/', RentalController.rentVoidRoute)

export default rentalRouter
