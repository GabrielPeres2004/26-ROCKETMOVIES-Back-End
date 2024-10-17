const knex = require("../database/knex")
const AppError = require("../utils/AppError")


class NotesControllers {
    async create(request, response) {
        const { title, description, rating, tags } = request.body
        const user_id = request.user.id

        try {

            const [note_id] = await knex("notes").insert({
                title,
                description,
                rating,
                user_id
            })

            const tagsInsert = tags.map(name => {
                return {
                    user_id,
                    note_id,
                    name
                }
            })

            await knex("tags").insert(tagsInsert)


            return response.json()

        } catch {
            throw new AppError("Não foi possivel cadastrar a nota");

        }

    }

    async show(request, response) {
        const { id } = request.params

        const note = await knex("notes").where({ id }).first()
        const tags = await knex("tags").where({ note_id: id }).orderBy("name")


        try {
            return response.json({
                ...note,
                tags
            })

        } catch {
            throw new AppError("Não foi possivel trazer informações da nota");
        }

    }

    async delete(request, response) {
        const { id } = request.params

        try {
            await knex('notes').where({ id }).delete()

            return response.json()

        } catch {
            throw new AppError("Não foi possivel deletar a nota");
        }

    }

    async Index(request, response) {
        const { title, tags } = request.query
        const user_id = request.user.id
        let notes

        try {

            notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy('title')

            const userTags = await knex("tags").where({ user_id })
            const userWithTags = notes.map(note => {
                const noteTags = userTags.filter(tag => tag.note_id === note.id)

                return {
                    ...note,
                    tags: noteTags
                }
            })
            response.json(userWithTags)

        } catch {
            throw new AppError("Não foi possivel visualizar as notas");
        }

    }
}

module.exports = NotesControllers