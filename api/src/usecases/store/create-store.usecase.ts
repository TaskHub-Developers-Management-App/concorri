import { prismaClient } from "../../../lib/prisma";
import { BadRequestError } from "../../_errors/bad-request.error";

type CreateStoreUseCaseParams = {
    name: string;
    address: string;
    phone: string;
    ownerId: string;
};

export async function createStoreUseCase(params: CreateStoreUseCaseParams) {
    const { name, address, phone, ownerId } = params;

    const [
        storeAlreadyWithPhone,
        storeAlreadyWithAddress,
        storeAlreadyWithOwner,
        ownerExists
    ] = await Promise.all([
        prismaClient.store.findUnique({
            where: {
                phone
            }
        }),
        prismaClient.store.findUnique({
            where: {
                address
            }
        }),
        prismaClient.store.findUnique({
            where: {
                ownerId
            }
        }),
        prismaClient.user.findUnique({
            where: {
                id: ownerId
            }
        })
    ])

    if (storeAlreadyWithPhone) {
        throw new BadRequestError("Phone already in use");
    }

    if (storeAlreadyWithAddress) {
        throw new BadRequestError("Address already in use");
    }

    if (storeAlreadyWithOwner) {
        throw new BadRequestError("Owner already has a store");
    }

    if (!ownerExists) {
        throw new BadRequestError("Owner does not exist");
    }

    const store = await prismaClient.store.create({
        data: {
            name,
            address,
            phone,
            ownerId
        }
    })

    return { store };
}
