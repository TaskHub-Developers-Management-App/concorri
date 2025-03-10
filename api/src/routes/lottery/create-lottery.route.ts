import type{ FastifyInstance } from "fastify";
import type{ ZodTypeProvider } from "fastify-type-provider-zod";
import { createLotteryUseCase } from "../../usecases/lottery/create-lottery.usecase";
import { z } from "zod";


export function CreateLotteryRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/stores',
            {
                schema: {
                    body: z.object({
                        storeId: z.string().uuid(),
                        name: z.string().trim().min(6),
                        description: z.string(),
                        status: z.literal('ACTIVE').or(z.literal('INACTIVE')),
                        drawDate: z.string()

                    })
                },
            },
            async (request, reply) => {
                request.jwtVerify();

                const {name, description, status, drawDate,storeId} = request.body;
                const data = await createLotteryUseCase({

                    name,
                    description,
                    status,
                    drawDate,
                    storeId
                    
                })

                return reply.status(201).send(data);
            }
        )
};