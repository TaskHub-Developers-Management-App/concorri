import { api } from "../api-client";

export type CreateLotteryPayload = {
    name: string;
    drawDate: string;
    description: string;
    couponPrice: number;
}

export async function createLotteryRequest(payload: CreateLotteryPayload) {
    const result = await api.post('lotteries', { json: payload }).json<any>();
    return result;
}