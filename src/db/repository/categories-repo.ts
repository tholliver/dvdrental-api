import dbConn from '../dbConn'

export const getAllCategories = async () => {
  return await dbConn.query.categorySchema.findMany()
}
