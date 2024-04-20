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
exports.GetSummaryCustomerPayments = exports.GetAllPaymentsByDate = exports.GetCustomerPayemnts = void 0;
const dbConn_1 = __importDefault(require("../dbConn"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema");
const GetCustomerPayemnts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default
        .select({
        amout: schema_1.paymentSchema.amount,
        userName: schema_1.customerSchema.first_name,
        userLastName: schema_1.customerSchema.last_name,
    })
        .from(schema_1.customerSchema)
        .where((0, drizzle_orm_1.eq)(schema_1.customerSchema.customer_id, userId))
        .innerJoin(schema_1.paymentSchema, (0, drizzle_orm_1.eq)(schema_1.customerSchema.customer_id, schema_1.paymentSchema.customer_id));
});
exports.GetCustomerPayemnts = GetCustomerPayemnts;
const GetAllPaymentsByDate = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default
        .select({
        date: (0, drizzle_orm_1.sql) `TO_CHAR(DATE_TRUNC('day', ${schema_1.paymentSchema.payment_date}), 'YYYY-MM-DD') AS date_only`,
        dayTotal: (0, drizzle_orm_1.sum)(schema_1.paymentSchema.amount),
    })
        .from(schema_1.paymentSchema)
        .groupBy((0, drizzle_orm_1.sql) `DATE_TRUNC('day',${schema_1.paymentSchema.payment_date})`)
        .orderBy((0, drizzle_orm_1.sql) `DATE_TRUNC('day',${schema_1.paymentSchema.payment_date})`);
});
exports.GetAllPaymentsByDate = GetAllPaymentsByDate;
const GetSummaryCustomerPayments = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConn_1.default
        .select({
        userName: schema_1.customerSchema.first_name,
        userLastName: schema_1.customerSchema.last_name,
        averagePayment: (0, drizzle_orm_1.sql) `round(cast(avg(${schema_1.paymentSchema.amount}) as numeric), 2)`.mapWith(Number),
        count: (0, drizzle_orm_1.count)(schema_1.customerSchema.customer_id),
        totalSpend: (0, drizzle_orm_1.sql) `round(cast(sum(${schema_1.paymentSchema.amount}) as numeric), 2)`.mapWith(Number),
    })
        .from(schema_1.customerSchema)
        .where((0, drizzle_orm_1.eq)(schema_1.customerSchema.customer_id, customerId))
        .leftJoin(schema_1.rentalSchema, (0, drizzle_orm_1.eq)(schema_1.rentalSchema.customer_id, schema_1.customerSchema.customer_id))
        .rightJoin(schema_1.paymentSchema, (0, drizzle_orm_1.eq)(schema_1.rentalSchema.rental_id, schema_1.paymentSchema.rental_id))
        .groupBy(schema_1.customerSchema.first_name, schema_1.customerSchema.last_name)
        .limit(1);
});
exports.GetSummaryCustomerPayments = GetSummaryCustomerPayments;
