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

    const qtdCouponsForSave = Math.floor(purchasePrice / lottery.couponPrice);

    const couponsForCreate = [
        ...Array.from(
            { length: qtdCouponsForSave },
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

    const createCouponsForSave = await prismaClient.coupon.createMany({
        data: couponsForCreate
    })

    const now = new Date();
    generateRafflePDF(
        {
            storeName: lottery.name,
            lotteryName: lottery.name
        },
        couponsForCreate,
        `./_temp/${now.toISOString().replace(/[:.]/g, '-')}.pdf`
    );

    return { coupons: couponsForCreate };

}