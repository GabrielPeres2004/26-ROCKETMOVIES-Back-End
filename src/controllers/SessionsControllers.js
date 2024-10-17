const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const knex = require("../database/knex")
const authConfigs = require("../configs/authConfigs")
const AppError = require("../utils/AppError")

class SessionsControllers {
    async create(request, response) {
        const { email, password } = request.body


        if (!email) {
            throw new AppError("Por favor insira e-mail");
        }


        if (!password) {
            throw new AppError("Por favor insira uma senha");
        }

        const user = await knex('users').where({ email }).first()

        if (!user) {
            throw new AppError("E-mail ou/e senha estão incorretos");
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError("E-mail ou/e senha estão incorretos");
        }

        const { secret, expiresIn } = authConfigs.jwt

        try {
            const token = sign({}, secret, {
                subject: String(user.id),
                expiresIn
            })

            return response.json({ user, token })

        } catch {
            throw new AppError("Não foi possivel gerar um token");


        }




    }

}

module.exports = SessionsControllers