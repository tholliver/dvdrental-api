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
  getFilmByTitleAndRating,
  getFilmByCategoryAndRating,
  getFilmByCategoryAndNameAndRating,
  getFilmByRating
} from '../db/repository/films-repo'

const filmRouter = Router()

class FilmsController {
  static async searchFilms(req: Request, res: Response, next: NextFunction) {
    const { category, rating, title, offset } = req.query;
    try {
      if (category && title && rating) {
        const categorizedFilm = await getFilmByCategoryAndNameAndRating(
          String(title),
          String(category),
          String(rating),
          Number(offset)
        );
        return res.status(200).send(categorizedFilm);
      }

      if (category && title && !rating) {
        const categorizedFilm = await getFilmByCategoryAndName(
          String(title),
          String(category),
          Number(offset)
        );
        return res.status(200).send(categorizedFilm);
      }

      if (category && !title && rating) {
        const filmsByCategory = await getFilmByCategoryAndRating(
          String(category),
          String(rating),
          Number(offset)
        );
        return res.status(200).send(filmsByCategory);
      }

      if (category && !title && !rating) {
        const filmsByCategory = await getFilmByCategory(
          String(category),
          Number(offset)
        );
        return res.status(200).send(filmsByCategory);
      }

      if (!title && !category && rating) {
        const films = await getFilmByRating(
          String(rating),
          Number(offset)
        );
        return res.status(200).send(films);

      }

      if (title && !category && rating) {
        const film = await getFilmByTitleAndRating(
          String(title),
          String(rating),
          Number(offset)
        );
        return res.status(200).send(film);
      }

      if (title && !category && !rating) {
        const film = await getFilmByTitle(
          String(title),
          Number(offset)
        );
        return res.status(200).send(film);
      }

      const films = await getAllFilms(Number(offset));
      return res.status(200).send(films);
    } catch (error) {
      next(error);
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
