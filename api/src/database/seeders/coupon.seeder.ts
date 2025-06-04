import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export async function couponSeeder(prismaService: PrismaClient) {
    const lotteries = await prismaService.lottery.findMany({
        select: {
            id: true
        }
    })

    const couponsData = [
        {
            id: randomUUID(),
            customerName: 'Customer 1',
            customerPhone: '+5596988887777',
            customerAddress: 'Rua 1, Bairro 2, Numero 3',
            customerCPF: '123.456.789-01',
            purchasePrice: 259.90,
            lotteryId: lotteries[0].id,
            createdAt: new Date(),
        },
        {
            id: randomUUID(),
            customerName: 'Customer 2',
            customerPhone: '+5596988886666',
            customerAddress: 'Rua 4, Bairro 5, Numero 6',
            customerCPF: '234.567.890-12',
            purchasePrice: 320.90,
            lotteryId: lotteries[1].id,
            createdAt: new Date(),
        },
        {
            id: randomUUID(),
            customerName: 'Customer 3',
            customerPhone: '+5596988885555',
            customerAddress: 'Rua 7, Bairro 8, Numero 9',
            customerCPF: '345.678.901-23',
            purchasePrice: 129.90,
            lotteryId: lotteries[2].id,
            createdAt: new Date(),
        },
        {
            id: randomUUID(),
            customerName: 'Customer 4',
            customerPhone: '+5596988884444',
            customerAddress: 'Rua 10, Bairro 11, Numero 12',
            customerCPF: '456.789.012-34',
            purchasePrice: 459.90,
            lotteryId: lotteries[3].id,
            createdAt: new Date(),
        },
        {
            id: randomUUID(),
            customerName: 'Customer 5',
            customerPhone: '+5596988883333',
            customerAddress: 'Rua 13, Bairro 14, Numero 15',
            customerCPF: '567.890.123-45',
            purchasePrice: 699.90,
            lotteryId: lotteries[4].id,
            createdAt: new Date(),
        }
    ]

    await prismaService.coupon.createMany({
        data: couponsData
    });
}