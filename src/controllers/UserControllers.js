const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const { hash, compare } = require('bcryptjs')

const UserRepository = require('../repositories/UserRepository')
const UserCreateServices = require('../services/UserCreateServices')

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        const userRepository = new UserRepository()

        const userCreateServices = new UserCreateServices(userRepository)

        const emailValidation = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        if (!emailValidation(email)) {
            throw new AppError("Por favor, insira um e-mail válido.");
        }

        await userCreateServices.execute({ name, email, password })

        return response.json()

    }

    async update(request, response) {
        const { name, email, password, oldPassword } = request.body
        const user_id = request.user.id

        const database = await sqliteConnection()

        const emailValidation = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        if (!emailValidation(email)) {
            throw new AppError("Por favor, insira um e-mail válido.");
        }

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if (!user) {
            throw new AppError("Usuário não encontrado.")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("E-mail ja está em uso.")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if (password && !oldPassword) {
            throw new AppError("Digite a senha antiga.")
        }

        if (!password && oldPassword) {
            throw new AppError("Digite a senha nova.")
        }

        if (password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password)

            if (!checkOldPassword) {
                throw new AppError("Senha antiga inválida")
            }

            user.password = await hash(password, 8)

        }


        await database.run(`
                UPDATE users SET
                name = ?,
                email = ?,
                password = ?,
                updated_at = DATETIME('now')
                WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        )

        return response.json()

    }

    async index(request, response) {
        const user_id = request.user.id
        const database = await sqliteConnection()

        const checkUserExists = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if (checkUserExists.length > 0) {
            throw new AppError("Unauthourized", 401);
        }

        return response.status(201).json();

    }
}

module.exports = UsersController