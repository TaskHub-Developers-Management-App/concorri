import fastify, { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { findAllCouponsByLotteryIdUseCase } from "../../usecases/coupon/find-all-coupons-by-lottery-id.usecase";
import { TokenPayload } from "../../_types/token";

export async function FindAllCouponsByLotteryIdRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get(
            '/coupons/lottery/:lotteryId',
            {
                schema: {
                    params: z.object({
                        lotteryId: z.string().uuid()
                    }),
                    querystring: z.object({
                        page: z.coerce.number().min(1).default(1),
                        limit: z.coerce.number().min(1).default(10),
                    })
                },
            }, async (request, reply) => {
                const token = await request.jwtVerify() as TokenPayload;

                const userId = token.sub;

                const { page, limit } = request.query;
                const { lotteryId } = request.params;

                const lotteryCouponsData = await findAllCouponsByLotteryIdUseCase(
                    {
                        page,
                        limit
                    },
                    lotteryId,
                    userId
                );

                return reply.status(200).send(lotteryCouponsData);
            }
        )
}