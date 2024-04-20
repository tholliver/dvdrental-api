import { NextFunction, Request, Response, Router } from 'express'
import { eq } from 'drizzle-orm'

import dbConn from '../db/dbConn'
import { filmSchema } from '../db/schema'

import { NotFoundError } from '../middleware/error-types'

import {
  getFilmById,
  getFilmByTitle,
  getAllFilms,
  getFilmByCategory,
  getFilmByCategoryAndName,
} from '../db/repository/films-repo'

const filmRouter = Router()

class FilmsController {
  static async searchFilms(req: Request, res: Response, next: NextFunction) {
    const { category, title } = req.query
    const offset = req.query.offset
    try {
      if (category && title) {
        const categorizedFilm = await getFilmByCategoryAndName(
          String(title),
          String(category),
          Number(offset)
        )
        return res.status(200).send(categorizedFilm)
      }

      if (category && !title) {
        const filmsByCategory = await getFilmByCategory(String(category), Number(offset))
        return res.status(200).send(filmsByCategory)
      }

      if (title && !category) {
        const film = await getFilmByTitle(String(title), Number(offset))
        return res.status(200).send(film)
      }

      const films = await getAllFilms(Number(offset))
      return res.status(200).send(films)
    } catch (error) {
      next(error)
    }
  }

  static async getFilms(req: Request<{ offset: number }>, res: Response, next: NextFunction) {
    const { offset } = req.query
    try {
      const films = await getAllFilms(Number(offset))
      return res.status(200).send(films)
    } catch (error) {
      next(error)
    }
  }

  static async getFilmById(req: Request<{ id: number }>, res: Response, next: NextFunction) {
    try {
      const film = await dbConn.query.filmSchema.findFirst({
        where: eq(filmSchema.film_id, req.params.id),
      })

      if (!film) throw new NotFoundError('film id not found')
      return res.status(200).send(film)
    } catch (error) {
      next(error)
    }
  }
}

filmRouter.get('/', FilmsController.getFilms)
filmRouter.get('/search', FilmsController.searchFilms)
filmRouter.get('/:id', FilmsController.getFilmById)

export default filmRouter
