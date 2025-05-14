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
            drawDate: "2025-10-11",
            drawTime: "13:40:20",
            status: LotteryStatus.ACTIVE,
            storeId: stores[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 2',
            description: 'Description 2',
            drawDate: "2025-07-01",
            drawTime: "15:45:10",
            status: LotteryStatus.INACTIVE,
            storeId: stores[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 3',
            description: 'Description 3',
            drawDate: "2025-04-30",
            drawTime: "09:10:50",
            status: LotteryStatus.ACTIVE,
            storeId: stores[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 4',
            description: 'Description 4',
            drawDate: "2025-08-21",
            drawTime: "14:20:30",
            status: LotteryStatus.ACTIVE,
            storeId: stores[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 5',
            description: 'Description 5',
            drawDate: "2025-12-31",
            drawTime: "23:59:59",
            status: LotteryStatus.INACTIVE,
            storeId: stores[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: randomUUID(),
            name: 'Lottery 6',
            description: 'Description 6',
            drawDate: "2025-01-27",
            drawTime: "22:59:59",
            status: LotteryStatus.ACTIVE,
            storeId: stores[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]

    await prismaService.lottery.createMany({
        data: lotteriesData
    });
}