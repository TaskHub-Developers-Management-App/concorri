import { type FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createStoreUseCase } from "../../usecases/store/create-store.usecase";

export function CreateStoreRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/stores',
            {
                schema: {
                    body: z.object({
                        name: z.string().trim().min(6),
                        address: z.string(),
                        phone: z.string(),
                        ownerId: z.string().uuid()
                    })
                },
            },
            async (request, reply) => {
                request.jwtVerify();

                const { name, address, phone, ownerId } = request.body;

                const data = await createStoreUseCase({
                    name,
                    address,
                    phone,
                    ownerId
                })

                return reply.status(201).send(data);
            }
        )
}