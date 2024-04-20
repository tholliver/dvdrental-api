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
exports.getFilmById = exports.getFilmByCategoryAndName = exports.getFilmByCategory = exports.getFilmByTitle = exports.getAllFilms = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dbConn_1 = __importDefault(require("../dbConn"));
const schema_1 = require("../schema");
const getAllFilms = (offset) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default.select().from(schema_1.filmSchema).limit(10).offset(offset);
});
exports.getAllFilms = getAllFilms;
const getFilmByTitle = (title, offset) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default
        .select(Object.assign({}, (0, drizzle_orm_1.getTableColumns)(schema_1.filmSchema)))
        .from(schema_1.filmSchema)
        .where((0, drizzle_orm_1.ilike)(schema_1.filmSchema.title, `%${title}%`))
        .limit(10)
        .offset(offset);
});
exports.getFilmByTitle = getFilmByTitle;
const getFilmByCategory = (category, offset) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default
        .select(Object.assign({}, (0, drizzle_orm_1.getTableColumns)(schema_1.filmSchema)))
        .from(schema_1.categorySchema)
        .innerJoin(schema_1.film_category, (0, drizzle_orm_1.eq)(schema_1.categorySchema.category_id, schema_1.film_category.category_id))
        .innerJoin(schema_1.filmSchema, (0, drizzle_orm_1.eq)(schema_1.film_category.film_id, schema_1.filmSchema.film_id))
        .where((0, drizzle_orm_1.eq)(schema_1.categorySchema.name, category))
        .limit(10)
        .offset(offset);
});
exports.getFilmByCategory = getFilmByCategory;
const getFilmByCategoryAndName = (title, category, offset) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default
        .select(Object.assign({}, (0, drizzle_orm_1.getTableColumns)(schema_1.filmSchema)))
        .from(schema_1.categorySchema)
        .innerJoin(schema_1.film_category, (0, drizzle_orm_1.eq)(schema_1.categorySchema.category_id, schema_1.film_category.category_id))
        .innerJoin(schema_1.filmSchema, (0, drizzle_orm_1.eq)(schema_1.film_category.film_id, schema_1.filmSchema.film_id))
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.ilike)(schema_1.filmSchema.title, `%${title}%`), (0, drizzle_orm_1.eq)(schema_1.categorySchema.name, category)))
        .limit(10)
        .offset(offset);
});
exports.getFilmByCategoryAndName = getFilmByCategoryAndName;
const getFilmById = (filmId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default
        .select()
        .from(schema_1.filmSchema)
        .where((0, drizzle_orm_1.eq)(schema_1.filmSchema.film_id, filmId));
});
exports.getFilmById = getFilmById;
// ORM TRY
// return await dbConn.query.categorySchema.findMany({
//   where: eq(categorySchema.name, category),
//   with: {
//     categoryToFilms: {
//       with: {
//         film: {
//           where: (film, { ilike }) => ilike(film.title, `%${title}%`),
//         },
//       },
//     },
//   },
// })
