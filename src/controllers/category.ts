import { Router, Response, Request, NextFunction } from 'express'
import { getAllCategories } from '../db/repository/categories-repo'

const categoryRouter = Router()

class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categoriesFound = await getAllCategories()
      return res.status(200).send(categoriesFound)
    } catch (error) {
      next(error)
    }
  }
}

categoryRouter.get('/', CategoryController.getAll)

export default categoryRouter
