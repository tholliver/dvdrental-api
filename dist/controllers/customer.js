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
const schema_1 = require("../db/schema");
const dbConn_1 = __importDefault(require("../db/dbConn"));
const payments_repo_1 = require("../db/repository/payments-repo");
const customerRouter = (0, express_1.Router)();
class CustomerController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resutls = yield dbConn_1.default.select().from(schema_1.customerSchema).execute();
            res.status(200).send(resutls);
        });
    }
    static getCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerFound = yield dbConn_1.default.query.customerSchema.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.customerSchema.customer_id, Number(req.params.id)),
                with: {
                    address: {
                        with: {
                            city: true
                        }
                    }
                },
            });
            const [avgCustomerPayment] = yield (0, payments_repo_1.GetSummaryCustomerPayments)(req.params.id);
            if (customerFound && avgCustomerPayment)
                return res
                    .status(200)
                    .send({ userInfo: customerFound, paymentsSummary: avgCustomerPayment });
            return res.send({ message: 'User not found' });
        });
    }
}
customerRouter.get('/:id', CustomerController.getCustomer);
customerRouter.get('/', CustomerController.getAll);
exports.default = customerRouter;
