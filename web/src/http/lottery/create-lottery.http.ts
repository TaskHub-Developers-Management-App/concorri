import { api } from "../api-client";

type CreateLotteryPayload = {
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE';
    storeId: string;
}

export async function createLotteryRequest(payload: CreateLotteryPayload) {
    const result = await api.post('lotteries', { json: payload }).json<any>();
    return result;
}