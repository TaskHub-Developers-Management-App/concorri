import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import * as bcrypt from 'bcrypt';

export async function userSeeder(prismaService: PrismaClient) {
    const saltRounds = 1;

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

    const usersData = await Promise.all(defaultUsers.map(async (user) => ({
        id: randomUUID(),
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(user.password, saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
    })));

    await prismaService.user.createMany({
        data: usersData
    })
};
