const { Router } = require("express")
const routes = Router()

const sessionRoutes = require("./session.routes ")
const userRoutes = require('./user.routes')
const notesRoutes = require('./notes.routes')
const tagsRoutes = require('./tags.routes')

routes.use('/users', userRoutes)
routes.use('/notes', notesRoutes)
routes.use('/tags', tagsRoutes)
routes.use('/sessions', sessionRoutes)

module.exports = routes