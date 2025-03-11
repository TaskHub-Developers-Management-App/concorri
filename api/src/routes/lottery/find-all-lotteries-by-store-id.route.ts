import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { findAllLotteriesByStoreIdUseCase } from "../../usecases/lottery/find-all-lotteries-by-store-id.usecase";

export async function FindAllLotteriesByStoreIdRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get(
            '/lotteries/store/:storeId',
            {
                schema: {
                    params: z.object({
                        storeId: z.string().uuid()
                    }),
                    querystring: z.object({
                        page: z.coerce.number().min(1).default(1),
                        limit: z.coerce.number().min(1).default(10),
                    })
                }
            },
            async (request, reply) => {

                request.jwtVerify();

                const { page, limit } = request.query;

                const { storeId } = request.params;

                const StoreLotteriesData = await findAllLotteriesByStoreIdUseCase({
                    page,
                    limit
                }, storeId);

                return reply.status(200).send(StoreLotteriesData);

            }
        )
}