import { Coupon } from "@prisma/client";
import { Pageable, PageableQuery } from "../../shared/pageable.type";
import { prismaClient } from "../../../lib/prisma";
import { InvalidQueryError } from "../../_errors/invalid-query-filter";
import { UnauthorizedUserRequestForCoupons } from "../../_errors/unauthorized-request-for-coupons-of-lottery.error";

export async function findAllCouponsByLotteryIdUseCase(
    query: PageableQuery,
    lotteryId: string,
    userId: string
): Promise<Pageable<Coupon>> {

    let shouldPaginate = query.page && query.limit;

    const { page, limit } = query;

    const [isRequestUserTheStoreOwner, lotteryCoupons, total] = await Promise.all([
        prismaClient.lottery.findFirst({
            where: {
                id: lotteryId,
                Store: {
                    ownerId: userId
                }
            }
        }),
        prismaClient.coupon.findMany({
            where: {
                lotteryId,
            },
            skip: shouldPaginate ? (page - 1) * limit : undefined,
            take: shouldPaginate ? limit : undefined,
        }),
        prismaClient.coupon.count({
            where: {
                lotteryId,
            },
        })
    ])

    if (!isRequestUserTheStoreOwner) {
        throw new UnauthorizedUserRequestForCoupons();
    }

    const totalPages = Math.ceil(total / limit);

    return {
        data: lotteryCoupons,
        meta: {
            total,
            page,
            limit,
            totalPages,
        }
    };
}