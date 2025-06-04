import { api } from "../api-client";

export type CreateCouponsPayload = {
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCPF: string
    purchasePrice: number
    lotteryId: string
}

export async function createCouponsRequest(payload: CreateCouponsPayload) {
    const result = await api.post('coupons', { json: payload }).json<any>();
    return result;
}