import { Store } from "@prisma/client";
import { prismaClient } from "../../../lib/prisma";
import { Pageable, PageableQuery } from "../../shared/pageable.type";
import { InvalidQueryError } from "../../_errors/invalid-query-filter";

export async function findAllStoresUseCase(query: PageableQuery): Promise<Pageable<Store>> {
    try {
        const { page, limit } = query;

        const [stores, total] = await Promise.all([
            prismaClient.store.findMany({
                skip: (page - 1) * limit,
                take: limit,
            }),
            prismaClient.store.count(),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: stores,
            meta: {
                total,
                page,
                limit,
                totalPages,
            }
        };

    } catch (error) {
        throw new InvalidQueryError();
    }
}