'use server'

import { createCouponsRequest, type CreateCouponsPayload } from "@/http/coupon/create-coupon.http";
import { createLotteryRequest, type CreateLotteryPayload } from "@/http/lottery/create-lottery.http";
import { HTTPError } from "ky";
import { revalidateTag } from "next/cache";

export async function createLotteryAction(data: CreateLotteryPayload) {

    try {
        await createLotteryRequest(data);

        revalidateTag('lotteries')

        return {
            success: true,
            message: 'Sorteio criado com sucesso'
        }

    } catch (error: any) {
        if (error instanceof HTTPError) {
            const { message } = await error.response.json();

            return {
                success: false,
                message
            }
        }

        return {
            success: false,
            message: 'Ocorreu um erro inesperado, tente novamente!'
        }
    }
}

export async function createCouponsAction(data: CreateCouponsPayload) {

    try {
        await createCouponsRequest(data);

        revalidateTag('coupons')

        return {
            success: true,
            message: 'Cupons gerados com sucesso!'
        }

    } catch (error: any) {
        if (error instanceof HTTPError) {
            const { message } = await error.response.json();

            return {
                success: false,
                message
            }
        }

        return {
            success: false,
            message: 'Ocorreu um erro inesperado, tente novamente!'
        }
    }
}