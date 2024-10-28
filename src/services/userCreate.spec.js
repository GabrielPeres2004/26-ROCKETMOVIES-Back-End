const UserCreateServices = require('./UserCreateServices')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')

it("user should be create", async () => {
    const user = {
        name: "User Test",
        email: "user@test.com",
        password: "123"
    }

    const userRepositoryInMemory = new UserRepositoryInMemory()

    const userCreateServices = new UserCreateServices(userRepositoryInMemory)
    const userCreated = await userCreateServices.execute(user);

    console.log(userCreated)

    expect(userCreated).toHaveProperty("id");
});