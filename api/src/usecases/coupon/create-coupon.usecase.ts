import { prismaClient } from "../../../lib/prisma";
import { generateRafflePDF } from "../../../utils/generate-raffle-coupons-pdf";

type createCouponUsecaseParams = {
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCPF: string
    purchasePrice: number
    lotteryId: string
};

export async function createCouponUsecase(params: createCouponUsecaseParams) {
    const {
        customerName,
        customerPhone,
        customerAddress,
        customerCPF,
        purchasePrice,
        lotteryId
    } = params;

    const lottery = await prismaClient.lottery.findFirst({
        where: {
            id: lotteryId
        },
        select: {
            id: true,
            couponPrice: true,
            name: true
        }
    })

    if (!lottery) {
        throw new Error('Lottery not found');
    }

    const amountCouponsForSave = Math.floor(purchasePrice / lottery.couponPrice);

    if (amountCouponsForSave <= 0) {
        throw new Error(`Amount required to participate on the raffle is not enough. Should be greater then ${lottery.couponPrice}`);
    }
    const couponsForCreate = [
        ...Array.from(
            { length: amountCouponsForSave },
            () => ({
                id: crypto.randomUUID(),
                customerName,
                customerPhone,
                customerAddress,
                customerCPF,
                purchasePrice,
                lotteryId
            }))
    ]

    const now = new Date();
    await Promise.all([
        prismaClient.coupon.createMany({
            data: couponsForCreate
        }),
        generateRafflePDF(
            {
                storeName: lottery.name,
                lotteryName: lottery.name
            },
            couponsForCreate,
            `./_temp/${now.toISOString().replace(/[:.]/g, '-')}.pdf`
        )
    ])

    return { coupons: couponsForCreate };

}