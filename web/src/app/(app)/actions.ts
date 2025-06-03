'use server'

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
            message: 'Erro ao realizar o login!'
        }
    }
}