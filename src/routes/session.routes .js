const { Router } = require("express")
const SessionControllers = require("../controllers/SessionsControllers")

const sessionRoutes = Router()
const sessionControllers = new SessionControllers

sessionRoutes.post("/", sessionControllers.create)

module.exports = sessionRoutes