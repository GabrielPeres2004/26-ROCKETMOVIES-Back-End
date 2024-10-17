const AppError = require("../utils/AppError")
const authConfigs = require("../configs/authConfigs")
const { verify } = require('jsonwebtoken')

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError("JWT token não inserido")
    }

    const [, token] = authHeader.split(' ')


    try {
        const { sub: user_id } = verify(token, authConfigs.jwt.secret)

        request.user = {
            id: Number(user_id)
        }

        return next()

    } catch {
        throw new AppError("Seu token JWT expirou. Por favor, faça login novamente ou recarregue a página para continuar.", 401);
    }
}

module.exports = ensureAuthenticated