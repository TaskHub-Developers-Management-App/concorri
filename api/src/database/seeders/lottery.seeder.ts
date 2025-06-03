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
            drawDate: new Date("2025-12-31"),
            status: LotteryStatus.ACTIVE,
            storeId: stores[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            couponPrice: 50
        },
        {
            id: randomUUID(),
            name: 'Lottery 2',
            description: 'Description 2',
            drawDate: new Date("2025-12-31"),
            status: LotteryStatus.INACTIVE,
            storeId: stores[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            couponPrice: 150
        },
        {
            id: randomUUID(),
            name: 'Lottery 3',
            description: 'Description 3',
            drawDate: new Date("2025-12-31"),
            status: LotteryStatus.ACTIVE,
            storeId: stores[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            couponPrice: 100
        },
        {
            id: randomUUID(),
            name: 'Lottery 4',
            description: 'Description 4',
            drawDate: new Date("2025-12-31"),
            status: LotteryStatus.ACTIVE,
            storeId: stores[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            couponPrice: 100
        },
        {
            id: randomUUID(),
            name: 'Lottery 5',
            description: 'Description 5',
            drawDate: new Date("2025-12-31"),
            status: LotteryStatus.INACTIVE,
            storeId: stores[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            couponPrice: 100
        },
        {
            id: randomUUID(),
            name: 'Lottery 6',
            description: 'Description 6',
            drawDate: new Date("2025-12-31"),
            status: LotteryStatus.ACTIVE,
            storeId: stores[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            couponPrice: 100
        }
    ]

    await prismaService.lottery.createMany({
        data: lotteriesData
    });
}