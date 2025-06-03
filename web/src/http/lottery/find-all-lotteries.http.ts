import type { PaginateResponse } from "@/types/pagination";
import type { LotteryStatus } from "@/types/lottery";
import { api } from "../api-client";


type FindAllLotteriesResponse = PaginateResponse<{
    status: LotteryStatus;
    storeId: string;
    name: string;
    id: string;
    description: string;
    drawDate: string;
    createdAt: string;
    updatedAt: string;
}>;

export async function findAllUserLotteriesRequest() {
    const result = await api.get(`lotteries/user`).json<FindAllLotteriesResponse>();
    return result;
}