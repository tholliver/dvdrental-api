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
// import { NotFoundError } from '../middleware/error-types.js'
const userRouter = (0, express_1.Router)();
class UserControlller {
    static getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const username = req.query.username
            // const searchKey = req.params.id
            //   ? { _id: `${req.params.id}` }
            //   : { username: username }
            // console.log(searchKey)
            // try {
            //   const userFound = await userModel.findOne(searchKey)
            //   console.log(userFound)
            //   if (!userFound) throw new NotFoundError('no user found')
            //   return res.status(200).send(userFound)
            // } catch (error) {
            //   next(error)
            // }
        });
    }
}
userRouter.get('/:id?', UserControlller.getUser);
// userRouter.get('/', UserControlller.get)
exports.default = userRouter;
