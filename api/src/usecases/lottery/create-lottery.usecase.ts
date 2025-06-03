import { prismaClient } from "../../../lib/prisma";
import { InvalidLotteryDrawDate } from "../../_errors/invalid-lottery-draw-date.error";
import { NotFoundError } from "../../_errors/not-found.error";

export type LotteryStatus = 'ACTIVE' | 'INACTIVE';

type CreatelotterriesCaseParams = {
    userId: string;
    name: string;
    description: string;
    drawDate: string;
    couponPrice: number;
};

export async function createLotteryUseCase(data: CreatelotterriesCaseParams) {

    const userStore = await prismaClient.store.findFirst({
        where: {
            User: {
                id: data.userId
            }
        }
    });

    if (!userStore) {
        throw new NotFoundError('Este usuário não possui uma loja cadastrada');
    }

    const currentDate = new Date();

    if (new Date(data.drawDate) < currentDate) {
        throw new InvalidLotteryDrawDate();
    }

    const lottery = await prismaClient.lottery.create({
        data: {
            name: data.name,
            description: data.description,
            drawDate: new Date(data.drawDate),
            storeId: userStore.id,
            couponPrice: data.couponPrice,
        }
    })

    return { lottery }

};