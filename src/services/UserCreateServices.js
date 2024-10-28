const AppError = require('../utils/AppError')
const { hash } = require('bcryptjs')

class UserCreateServices {

    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ name, email, password }) {

        const checkUserExist = await this.userRepository.findByEmail(email)

        if (!name) {
            throw new AppError("Digite um nome.")
        }

        if (!email) {
            throw new AppError("Digite um e-mail.")
        }

        if (checkUserExist) {
            throw new AppError("E-mail ja está em uso.")
        }

        if (!password) {
            throw new AppError("Digite uma senha.")
        }

        const hashedPassword = await hash(password, 8)

        try {
            await this.userRepository.create({ name, email, password: hashedPassword })
            return
        } catch {
            throw new AppError("Não foi possivel criar a sua conta");
        }


    }


}

module.exports = UserCreateServices