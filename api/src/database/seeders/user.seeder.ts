import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export async function userSeeder(prismaService: PrismaClient) {

    const defaultUsers = [
        {
            name: 'John Doe',
            email: 'john.doe@concorri.com',
            password: 'johndoe123',
        },
        {
            name: 'Bob Smith',
            email: 'bob.smith@concorri.com',
            password: 'bobsmith123',
        },
        {
            name: 'Arthur Mousinho',
            email: 'arthur.mousinho@concorri.com',
            password: 'arthur123',
        },
        {
            name: 'Vinicius Barbosa',
            email: 'vinicius.barbosa@concorri.com',
            password: 'vinicius123',
        },
        {
            name: 'Gustavo Felix',
            email: 'gustavo.felix@concorri.com',
            password: 'gustavo123',
        }
    ]

    const usersData = defaultUsers.map((user) => ({
        id: randomUUID(),
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    await prismaService.user.createMany({
        data: usersData
    })
};