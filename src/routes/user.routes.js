const uploadsConfigs = require('../configs/upload')
const multer = require("multer")

const { Router } = require("express")
const userRoutes = Router()

const UsersController = require("../controllers/UserControllers")
const usersController = new UsersController

const UserAvatarController = require('../controllers/UserAvatarController')
const userAvatarController = new UserAvatarController

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const upload = multer(uploadsConfigs.MULTER)

userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthenticated, usersController.update)
userRoutes.get("/", ensureAuthenticated, usersController.index)
userRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

module.exports = userRoutes