import dbConn from '../db/dbConn'
import { NextFunction, Request, Response, Router } from 'express'
import { storeSchema } from '../db/schema'
import { eq } from 'drizzle-orm'
import { NotFoundError } from '../middleware/error-types'

const storeRouter = Router()

class StoreController {
  static async getStore(req: Request<{ id: number }>, res: Response, next: NextFunction) {
    try {
      const storeFound = await dbConn.query.storeSchema.findFirst({
        where: eq(storeSchema.store_id, req.params.id),
      })

      if (!storeFound) {
        throw new NotFoundError('store not found!')
      }
      return res.status(200).send(storeFound)
    } catch (error) {
      next(error)
    }
  }

  static getTokenFrom = (req: Request) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      return authorization.substring(7)
    }
    return null
  }

  static async getStores(req: Request, res: Response, next: NextFunction) {
    const allStores = await dbConn.query.storeSchema.findMany()

    return res.status(200).send(allStores)
  }
}

storeRouter.get('/:id', StoreController.getStore)
storeRouter.get('/', StoreController.getStores)

export default storeRouter
