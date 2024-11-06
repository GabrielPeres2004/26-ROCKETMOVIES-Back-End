require("express-async-errors")
require("dotenv/config")
const express = require("express")
const app = express()

const routes = require("./routes")
const AppError = require("./utils/AppError")
const migrationsRun = require('./database/sqlite/migrations')
const uploadConfigs = require("./configs/upload")
const cors = require('cors')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://rocketmovies-full-stack.netlify.app"
        ],
        credentials: true,
    })
)

app.use('/files', express.static(uploadConfigs.UPLOAD_FOLDER))
app.use(routes)

migrationsRun()

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "Error",
            message: error.message
        })
    }

    console.error(error)


    return response.status(500).json({
        status: "Error",
        message: "Error internal server"
    })

})

const PORT = process.env.PORT || 3333
app.listen(PORT, console.log(`Server is Running in port ${PORT}`))