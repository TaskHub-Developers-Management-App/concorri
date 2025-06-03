import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { findAllLotteriesByStoreIdUseCase } from "../../usecases/lottery/find-all-lotteries-by-store-id.usecase";

export async function FindAllLotteriesByUserIdRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get(
            '/lotteries/user',
            {
                schema: {
                    querystring: z.object({
                        page: z.coerce.number().min(1).default(1),
                        limit: z.coerce.number().min(1).default(10),
                    })
                }
            },
            async (request, reply) => {

                await request.jwtVerify();
                const userId = (request.user as any).sub;

                const { page, limit } = request.query;

                const StoreLotteriesData = await findAllLotteriesByStoreIdUseCase({
                    page,
                    limit
                }, userId);

                return reply.status(200).send(StoreLotteriesData);

            }
        )
}