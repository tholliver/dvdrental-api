import app from "./app";
import { PORT } from "./config";


export const StartServer = async () => {
    app.listen(
        PORT, () => {
            console.log(`Server running on: http://localhost:${PORT}`)
        }
    )
}

