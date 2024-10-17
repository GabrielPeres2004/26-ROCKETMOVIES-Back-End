const AppError = require('../utils/AppError')
const knex = require("../database/knex");

const DiskStorage = require('../provider/DiskStorage')

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id
        const diskStorage = new DiskStorage()

        const AvatarFileName = request.file.filename

        const user = await knex("users").where({ id: user_id }).first()

        if (!user) {
            throw new AppError("Somente usúarios autenticados podem mudar o seu avatar");
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const fileName = await diskStorage.saveFile(AvatarFileName)
        user.avatar = fileName

        await knex("users").update(user).where({ id: user_id })

        return response.json(user)

    }

}

module.exports = UserAvatarController