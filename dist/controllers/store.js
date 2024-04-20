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
const dbConn_1 = __importDefault(require("../db/dbConn"));
const express_1 = require("express");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const error_types_1 = require("../middleware/error-types");
const storeRouter = (0, express_1.Router)();
class StoreController {
    static getStore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeFound = yield dbConn_1.default.query.storeSchema.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.storeSchema.store_id, req.params.id),
                });
                if (!storeFound) {
                    throw new error_types_1.NotFoundError('store not found!');
                }
                return res.status(200).send(storeFound);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getStores(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const allStores = yield dbConn_1.default.query.storeSchema.findMany();
            return res.status(200).send(allStores);
        });
    }
}
StoreController.getTokenFrom = (req) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7);
    }
    return null;
};
storeRouter.get('/:id', StoreController.getStore);
storeRouter.get('/', StoreController.getStores);
exports.default = storeRouter;
