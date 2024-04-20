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
const schema_1 = require("../db/schema");
const express_1 = require("express");
const dbConn_1 = __importDefault(require("../db/dbConn"));
const drizzle_orm_1 = require("drizzle-orm");
const payments_repo_1 = require("../db/repository/payments-repo");
// import { NotFoundError } from '../middleware/error-types'
const paymentRouter = (0, express_1.Router)();
class PaymentController {
    static getPayements(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = dbConn_1.default.query.paymentSchema.findMany();
                //   if (!payments) return NotFoundError('no payments')
                return res.status(200).send(payments);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getCutomerTotalPayments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const customer
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getPayementsByDate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield (0, payments_repo_1.GetAllPaymentsByDate)();
                res.json(payments);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getCustomerPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const customerPayemnt = await dbConn.query.customerSchema.findMany({
                //   where: eq(customerSchema.customer_id, req.params.userId),
                //   with: {
                //     payments: true,
                //     rentals: true,
                //   },
                // })
                const customerPayemnt = yield dbConn_1.default
                    .select({
                    amout: schema_1.paymentSchema.amount,
                    userName: schema_1.customerSchema.first_name,
                    userLastName: schema_1.customerSchema.last_name,
                })
                    .from(schema_1.customerSchema)
                    .where((0, drizzle_orm_1.eq)(schema_1.customerSchema.customer_id, req.params.customerId))
                    .innerJoin(schema_1.paymentSchema, (0, drizzle_orm_1.eq)(schema_1.customerSchema.customer_id, schema_1.paymentSchema.customer_id));
                const [avgCustomerPayment] = yield (0, payments_repo_1.GetSummaryCustomerPayments)(req.params.customerId);
                return res.json(avgCustomerPayment);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
paymentRouter.get('/', PaymentController.getPayements);
paymentRouter.get('/date-pays', PaymentController.getPayementsByDate);
paymentRouter.get('/customer/:customerId', PaymentController.getCustomerPayment);
exports.default = paymentRouter;
