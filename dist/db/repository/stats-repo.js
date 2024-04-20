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
exports.getTotalCustomers = exports.unitsOnInventory = exports.getTotalPaysByDate = exports.getTotalRentsByDate = void 0;
const dbConn_1 = __importDefault(require("../dbConn"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema");
function getTotalRentsByDate(startDate) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentDate = new Date().toISOString().slice(0, 10);
        return yield dbConn_1.default
            .select({
            totalRents: (0, drizzle_orm_1.count)(),
        })
            .from(schema_1.rentalSchema)
            .where((0, drizzle_orm_1.sql) `${schema_1.rentalSchema.last_update}::date BETWEEN ${startDate} AND ${currentDate}`);
    });
}
exports.getTotalRentsByDate = getTotalRentsByDate;
function getTotalPaysByDate(startDate) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentDate = new Date().toISOString().slice(0, 10);
        return yield dbConn_1.default
            .select({ sum: (0, drizzle_orm_1.sql) `COALESCE(SUM(${schema_1.paymentSchema.amount}), 0)` })
            .from(schema_1.paymentSchema)
            .where((0, drizzle_orm_1.sql) `${schema_1.paymentSchema.payment_date}::date BETWEEN ${startDate} AND ${currentDate}`);
    });
}
exports.getTotalPaysByDate = getTotalPaysByDate;
function unitsOnInventory(startDate) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentDate = new Date().toISOString().slice(0, 10);
        return yield dbConn_1.default.select({ units: (0, drizzle_orm_1.count)() }).from(schema_1.inventorySchema);
    });
}
exports.unitsOnInventory = unitsOnInventory;
function getTotalCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield dbConn_1.default.select({ totalCustomers: (0, drizzle_orm_1.count)() }).from(schema_1.customerSchema);
    });
}
exports.getTotalCustomers = getTotalCustomers;
