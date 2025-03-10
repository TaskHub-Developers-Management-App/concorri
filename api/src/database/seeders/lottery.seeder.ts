import { LotteryStatus, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export async function lotterySeeder(prismaService: PrismaClient) {
    const stores = await prismaService.store.findMany({
        select: {
            id: true
        }
    });

    const lotteriesData = [
        {
            id: randomUUID(),
            name: 'Lottery 1',
            description: 'Description 1',
            drawDate: new Date(),
            status: LotteryStatus.ACTIVE,
            storeId: stores[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 2',
            description: 'Description 2',
            drawDate: new Date(),
            status: LotteryStatus.INACTIVE,
            storeId: stores[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 3',
            description: 'Description 3',
            drawDate: new Date(),
            status: LotteryStatus.ACTIVE,
            storeId: stores[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 4',
            description: 'Description 4',
            drawDate: new Date(),
            status: LotteryStatus.ACTIVE,
            storeId: stores[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 5',
            description: 'Description 5',
            drawDate: new Date(),
            status: LotteryStatus.INACTIVE,
            storeId: stores[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]

    await prismaService.lottery.createMany({
        data: lotteriesData
    });
}