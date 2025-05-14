import { prismaClient } from "../../../lib/prisma";
import { InvalidDateOrTimeError } from "../../_errors/invalid-date-or-time.error";
import { StoreDoesNotBelongToUserError } from "../../_errors/store-does-not-belong-to-user.error";

export type LotteryStatus = 'ACTIVE' | 'INACTIVE';

type createlotterriesCaseParams = {
    name: string;
    description: string;
    status: LotteryStatus;
    drawDate: string;
    drawTime: string;
    storeId: string;
};

export async function createLotteryUseCase(params: createlotterriesCaseParams, userId: string) {
    const {
        name,
        description,
        status,
        drawDate,
        drawTime,
        storeId
    } = params;

    const today = new Date();
    const lotteryDrawDateTime = new Date(`${drawDate}T${drawTime}`);

    if (lotteryDrawDateTime <= today) {
        throw new InvalidDateOrTimeError();
    }

    const storesFromUser = await prismaClient.store.findMany({
        where: {
            ownerId: userId
        }
    })

    const storeBelongsToUser = storesFromUser.some((store) => store.id === storeId);

    if (!storeBelongsToUser) {
        throw new StoreDoesNotBelongToUserError();
    }

    const lottery = await prismaClient.lottery.create({
        data: {
            name,
            description,
            status,
            drawDate,
            drawTime,
            storeId
        }
    })

    return { lottery };
};