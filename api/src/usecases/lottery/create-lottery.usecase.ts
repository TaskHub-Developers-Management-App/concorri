import { prismaClient } from "../../../lib/prisma";


export type LotteryStatus = 'ACTIVE' | 'INACTIVE';

type createlotterriesCaseParams = {
    name: string;
    description: string;
    status: LotteryStatus;
    drawDate: Date;
    storeId: string;
};

export async function createLotteryUseCase(params: createlotterriesCaseParams) {
    const { name, description, status, drawDate, storeId } = params;

    const lottery = await prismaClient.lottery.create({
        data: {
            name,
            description,
            status,
            drawDate,
            storeId
        }
    })
    return {lottery};
};