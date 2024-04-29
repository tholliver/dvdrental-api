import { Router, Response, Request, NextFunction } from 'express'
import {
  getTotalRentsByDate,
  getTotalPaysByDate,
  getTotalCustomers,
  getTotalFilms,
  unitsOnInventory,
} from '../db/repository/stats-repo'

const statsRouter = Router()

class Stats {
  static generalStats = async (req: Request, res: Response, next: NextFunction) => {
    const { startdate } = req.query
    try {
      const [rents] = await getTotalRentsByDate(String(startdate))
      const [totalMade] = await getTotalPaysByDate(String(startdate))
      const [totalFilms] = await getTotalFilms()
      const [totalCustomers] = await getTotalCustomers()
      const [unitsInventory] = await unitsOnInventory(String(startdate))
      return res.status(200).send({
        rents: rents.totalRents,
        totalMade: totalMade.sum,
        units: unitsInventory.units,
        films: totalFilms.totalFilms,
        customers: totalCustomers.totalCustomers,
      })
    } catch (error) {
      next(error)
    }
  }
}

statsRouter.get('/', Stats.generalStats)

export default statsRouter
