require("express-async-errors")
const express = require("express")
const app = express()

const routes = require("./routes")
const AppError = require("./utils/AppError")
const migrationsRun = require('./database/sqlite/migrations')

app.use(express.json())

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

const PORT = 3333
app.listen(PORT, console.log(`Server is Running in port ${PORT}`))