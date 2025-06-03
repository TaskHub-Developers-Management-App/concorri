import { Lottery } from "@prisma/client";
import { prismaClient } from "../../../lib/prisma";
import { Pageable, PageableQuery } from "../../shared/pageable.type";
import { InvalidQueryError } from "../../_errors/invalid-query-filter";

export async function findAllLotteriesByUserIdUseCase(
    query: PageableQuery,
    userId: string
): Promise<Pageable<Lottery>> {

    let shouldPaginate = query.page && query.limit;

    try {
        const { page, limit } = query;

        const [lotteries, total] = await Promise.all([
            prismaClient.lottery.findMany({
                where: {
                    Store: {
                        User: {
                            id: userId
                        }
                    },
                },
                skip: shouldPaginate ? (page - 1) * limit : undefined,
                take: shouldPaginate ? limit : undefined,
            }),
            prismaClient.lottery.count({
                where: {
                    Store: {
                        User: {
                            id: userId
                        }
                    },
                },
            })
        ])

        const totalPages = Math.ceil(total / limit);

        return {
            data: lotteries,
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