import { prismaClient } from "../../../lib/prisma";

type createCouponUsecaseParams = {
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCPF: string
    lotteryId: string
};

export async function createCouponUsecase(params: createCouponUsecaseParams) {
    const {
        customerName,
        customerPhone,
        customerAddress,
        customerCPF,
        lotteryId
    } = params;

    const coupon = await prismaClient.coupon.create({
        data: {
            customerName,
            customerPhone,
            customerAddress,
            customerCPF,
            lotteryId
        }
    })

    return { coupon };

}