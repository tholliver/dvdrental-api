"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drizzle_orm_1 = require("drizzle-orm");
const dbConn_1 = __importDefault(require("../db/dbConn"));
const schema_1 = require("../db/schema");
const error_types_1 = require("../middleware/error-types");
const films_repo_1 = require("../db/repository/films-repo");
const filmRouter = (0, express_1.Router)();
class FilmsController {
    static searchFilms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category, title } = req.query;
            const offset = req.query.offset;
            try {
                if (category && title) {
                    const categorizedFilm = yield (0, films_repo_1.getFilmByCategoryAndName)(String(title), String(category), Number(offset));
                    return res.status(200).send(categorizedFilm);
                }
                if (category && !title) {
                    const filmsByCategory = yield (0, films_repo_1.getFilmByCategory)(String(category), Number(offset));
                    return res.status(200).send(filmsByCategory);
                }
                if (title && !category) {
                    const film = yield (0, films_repo_1.getFilmByTitle)(String(title), Number(offset));
                    return res.status(200).send(film);
                }
                const films = yield (0, films_repo_1.getAllFilms)(Number(offset));
                return res.status(200).send(films);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getFilms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { offset } = req.query;
            try {
                const films = yield (0, films_repo_1.getAllFilms)(Number(offset));
                return res.status(200).send(films);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getFilmById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const film = yield dbConn_1.default.query.filmSchema.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.filmSchema.film_id, req.params.id),
                });
                if (!film)
                    throw new error_types_1.NotFoundError('film id not found');
                return res.status(200).send(film);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
filmRouter.get('/', FilmsController.getFilms);
filmRouter.get('/search', FilmsController.searchFilms);
filmRouter.get('/:id', FilmsController.getFilmById);
exports.default = filmRouter;
