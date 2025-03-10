import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { create } from "domain";

export async function storeSeeder(prismaService: PrismaClient) {
    const owners = await prismaService.user.findMany({
        select: {
            id: true
        }
    })

    const storesData = [
        {
            id: randomUUID(),
            name: 'Store 1',
            phone: '+5596988887777',
            address: 'Rua 1, Bairro 2, Numero 3',
            ownerId: owners[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Store 2',
            phone: '+5596988886666',
            address: 'Rua 4, Bairro 5, Numero 6',
            ownerId: owners[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Store 3',
            phone: '+5596988885555',
            address: 'Rua 7, Bairro 8, Numero 9',
            ownerId: owners[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Store 4',
            phone: '+5596988884444',
            address: 'Rua 10, Bairro 11, Numero 12',
            ownerId: owners[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Store 5',
            phone: '+5596988883333',
            address: 'Rua 13, Bairro 14, Numero 15',
            ownerId: owners[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]

    await prismaService.store.createMany({
        data: storesData
    });
}