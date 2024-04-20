import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
    console.log('RUNNING DEVELOPMENT MODE')
    const configFile = `./.env.${process.env.NODE_ENV}`
    // const configFile = path.join(__dirname,'..', `.env.${process.env.NODE_ENV}`);
    dotenv.config({ path: configFile })
}
if (process.env.NODE_ENV === 'production') {
    console.log('RUNNING PRODUCTION MODE')
    dotenv.config()

}

const PORT = process.env.PORT || 3005
const MONGO_URI = process.env.MONGO_URI
const PG_URI = process.env.PG_URI

export { PORT, MONGO_URI, PG_URI }