const UserCreateServices = require('./UserCreateServices')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
const AppError = require('../utils/AppError')


describe("userCreateServices", () => {
    let userRepositoryInMemory = null
    let userCreateServices = null

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateServices = new UserCreateServices(userRepositoryInMemory)
    })

    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123"
        }

        const userCreated = await userCreateServices.execute(user);
        expect(userCreated).toHaveProperty("id");
    });

    it("user not should be create with exists email", async () => {
        const user1 = {
            name: "User Test 1",
            email: "user@test.com",
            password: "123"
        }

        const user2 = {
            name: "User Test 2",
            email: "user@test.com",
            password: "123"
        }

        await userCreateServices.execute(user1)
        await expect(userCreateServices.execute(user2)).rejects.toEqual(new AppError("E-mail ja está em uso."))

    })

})
