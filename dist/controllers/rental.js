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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rental_repo_1 = require("../db/repository/rental-repo");
const rentalRouter = (0, express_1.Router)();
class RentalController {
    static getCustomerRentals(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customer_id } = req.params;
            console.log(customer_id, typeof customer_id);
            try {
                const customerRentals = yield (0, rental_repo_1.GetOneCustomerRentals)(Number(customer_id));
                return res.status(200).json(customerRentals);
            }
            catch (error) {
                console.log('Something happened:', error);
                next(error);
            }
        });
    }
    static totalTopRentedFilms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { time, lapse } = req.query;
            try {
                if (time && lapse) {
                    console.log('Here conditioning', time, 'Lapse: ', lapse);
                    const topFilmsRented = yield (0, rental_repo_1.GetTopRentedFilmsTimeLapsed)(String(time), Number(lapse));
                    return res.status(200).json(topFilmsRented);
                }
                const topFilmsRented = yield (0, rental_repo_1.GetTopRentedFilms)();
                return res.status(200).json(topFilmsRented);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static rentsPerGroupDate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { by } = req.query;
            try {
                const totalRents = yield (0, rental_repo_1.GetRentsByDateGroup)(String(by));
                res.status(200).json(totalRents);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static rentVoidRoute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ msg: 'u are in rentals' });
        });
    }
}
rentalRouter.get('/', RentalController.totalTopRentedFilms);
rentalRouter.get('/totals', RentalController.rentsPerGroupDate);
rentalRouter.get('/:customer_id', RentalController.getCustomerRentals);
// rentalRouter.get('/', RentalController.rentVoidRoute)
exports.default = rentalRouter;
