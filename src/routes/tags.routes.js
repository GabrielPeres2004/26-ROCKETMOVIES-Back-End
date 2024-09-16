const { Router } = require("express")
const TagsControllers = require("../controllers/TagsControllers")

const tagsRoutes = Router()
const tagsControllers = new TagsControllers()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')


tagsRoutes.get("/", ensureAuthenticated, tagsControllers.index)


module.exports = tagsRoutes