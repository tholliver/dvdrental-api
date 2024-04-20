import { Router, Response, Request, NextFunction } from 'express'

// import { NotFoundError } from '../middleware/error-types.js'
const userRouter = Router()

class UserControlller {
  static async getUser(req: Request, res: Response, next: NextFunction) {
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
  }
}

userRouter.get('/:id?', UserControlller.getUser)
// userRouter.get('/', UserControlller.get)

export default userRouter
