import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { findAllStoresUseCase } from "../../usecases/store/find-all-stores.usecase";

export async function FindAllStoresRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get(
            '/stores',
            {
                schema: {
                    querystring: z.object({
                        page: z.coerce.number().min(1).default(1),
                        limit: z.coerce.number().min(1).max(100).default(10),
                    })
                },
            },
            async (request, reply) => {

                request.jwtVerify();

                const { page, limit } = request.query;

                const findAllQueryData = await findAllStoresUseCase({ page, limit });

                return reply.status(200).send(findAllQueryData);

            }
        )
}