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
exports.GetRentsByDateGroup = exports.GetTopRentedFilms = exports.GetTopRentedFilmsTimeLapsed = exports.GetOneCustomerRentals = void 0;
const dbConn_1 = __importDefault(require("../dbConn"));
const drizzle_orm_1 = require("drizzle-orm");
const repo_utils_1 = require("../../utils/repo-utils");
const schema_1 = require("../schema");
const GetOneCustomerRentals = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default
        .select({
        filmName: schema_1.filmSchema.title,
        rentalDate: schema_1.rentalSchema.rental_date,
        returnDate: schema_1.rentalSchema.return_date,
        amountPaid: (0, drizzle_orm_1.sql) `${schema_1.paymentSchema.amount}`.mapWith(Number),
    })
        .from(schema_1.filmSchema)
        .innerJoin(schema_1.inventorySchema, (0, drizzle_orm_1.eq)(schema_1.filmSchema.film_id, schema_1.inventorySchema.film_id))
        .innerJoin(schema_1.rentalSchema, (0, drizzle_orm_1.eq)(schema_1.inventorySchema.inventory_id, schema_1.rentalSchema.inventory_id))
        .innerJoin(schema_1.paymentSchema, (0, drizzle_orm_1.eq)(schema_1.paymentSchema.rental_id, schema_1.rentalSchema.rental_id))
        .where((0, drizzle_orm_1.eq)(schema_1.rentalSchema.customer_id, customerId));
});
exports.GetOneCustomerRentals = GetOneCustomerRentals;
const GetTopRentedFilmsTimeLapsed = (time, lapse) => __awaiter(void 0, void 0, void 0, function* () {
    const timelapseTyped = (0, repo_utils_1.timeLapseConverter)(time, lapse);
    const queryRes = yield dbConn_1.default
        .select({
        film_id: schema_1.filmSchema.film_id,
        filmName: schema_1.filmSchema.title,
        amountMade: (0, drizzle_orm_1.sum)(schema_1.paymentSchema.amount),
        rating: schema_1.filmSchema.rating,
        rentedTimes: (0, drizzle_orm_1.sql) `count(${schema_1.filmSchema.film_id})`,
    })
        .from(schema_1.filmSchema)
        .innerJoin(schema_1.inventorySchema, (0, drizzle_orm_1.eq)(schema_1.filmSchema.film_id, schema_1.inventorySchema.film_id))
        .innerJoin(schema_1.rentalSchema, (0, drizzle_orm_1.eq)(schema_1.inventorySchema.inventory_id, schema_1.rentalSchema.inventory_id))
        .innerJoin(schema_1.paymentSchema, (0, drizzle_orm_1.eq)(schema_1.rentalSchema.rental_id, schema_1.paymentSchema.rental_id))
        .where((0, drizzle_orm_1.between)(schema_1.rentalSchema.rental_date, (0, drizzle_orm_1.sql) `${timelapseTyped}`, (0, drizzle_orm_1.sql) `CURRENT_DATE`))
        .groupBy(schema_1.filmSchema.film_id)
        .orderBy((0, drizzle_orm_1.desc)((0, drizzle_orm_1.sql) `count(${schema_1.filmSchema.film_id})`));
    return queryRes;
});
exports.GetTopRentedFilmsTimeLapsed = GetTopRentedFilmsTimeLapsed;
const GetTopRentedFilms = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRes = yield dbConn_1.default
        .select({
        film_id: schema_1.filmSchema.film_id,
        filmName: schema_1.filmSchema.title,
        amountMade: (0, drizzle_orm_1.sum)(schema_1.paymentSchema.amount),
        rating: schema_1.filmSchema.rating,
        rentedTimes: (0, drizzle_orm_1.sql) `count(${schema_1.filmSchema.film_id})`,
    })
        .from(schema_1.filmSchema)
        .innerJoin(schema_1.inventorySchema, (0, drizzle_orm_1.eq)(schema_1.filmSchema.film_id, schema_1.inventorySchema.film_id))
        .innerJoin(schema_1.rentalSchema, (0, drizzle_orm_1.eq)(schema_1.inventorySchema.inventory_id, schema_1.rentalSchema.inventory_id))
        .innerJoin(schema_1.paymentSchema, (0, drizzle_orm_1.eq)(schema_1.rentalSchema.rental_id, schema_1.paymentSchema.rental_id))
        .groupBy(schema_1.filmSchema.film_id)
        .orderBy((0, drizzle_orm_1.desc)((0, drizzle_orm_1.sql) `count(${schema_1.filmSchema.film_id})`));
    return queryRes;
});
exports.GetTopRentedFilms = GetTopRentedFilms;
const GetRentsByDateGroup = (by) => __awaiter(void 0, void 0, void 0, function* () {
    const groupBy = (0, repo_utils_1.getGroupByKey)(by);
    return yield dbConn_1.default.execute(drizzle_orm_1.sql.raw(`select TO_CHAR(DATE_TRUNC('${groupBy.spec}', return_date), '${groupBy.format}') AS date, count(*) 
                from rental
                group by DATE_TRUNC('${groupBy.spec}', return_date)
                order by date
                limit 7
                `));
});
exports.GetRentsByDateGroup = GetRentsByDateGroup;
