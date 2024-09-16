const { Router } = require("express")
const userRoutes = Router()

const UsersController = require("../controllers/UserControllers")
const usersController = new UsersController

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthenticated, usersController.update)


module.exports = userRoutes