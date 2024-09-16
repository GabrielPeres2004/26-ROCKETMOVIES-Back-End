const { Router } = require("express")
const NotesControllers = require("../controllers/NotesControllers")

const notesRoutes = Router()
const notesControllers = new NotesControllers

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

notesRoutes.use(ensureAuthenticated)

notesRoutes.post("/", notesControllers.create)
notesRoutes.get("/:id", notesControllers.show)
notesRoutes.delete("/:id", notesControllers.delete)
notesRoutes.get("/", notesControllers.Index)

module.exports = notesRoutes