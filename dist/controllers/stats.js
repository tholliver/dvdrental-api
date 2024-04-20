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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_repo_1 = require("../db/repository/stats-repo");
const statsRouter = (0, express_1.Router)();
class Stats {
}
_a = Stats;
Stats.generalStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { startdate } = req.query;
    try {
        const [rents] = yield (0, stats_repo_1.getTotalRentsByDate)(String(startdate));
        const [totalMade] = yield (0, stats_repo_1.getTotalPaysByDate)(String(startdate));
        const [totalCustomers] = yield (0, stats_repo_1.getTotalCustomers)();
        const [unitsInventory] = yield (0, stats_repo_1.unitsOnInventory)(String(startdate));
        return res.status(200).send({
            rents: rents.totalRents,
            totalMade: totalMade.sum,
            units: unitsInventory.units,
            customers: totalCustomers.totalCustomers,
        });
    }
    catch (error) {
        next(error);
    }
});
statsRouter.get('/', Stats.generalStats);
exports.default = statsRouter;
