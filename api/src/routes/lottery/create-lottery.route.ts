import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createLotteryUseCase } from "../../usecases/lottery/create-lottery.usecase";
import { z } from "zod";
import { TokenPayload } from "../../_types/token";

export function CreateLotteryRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/lotteries',
            {
                schema: {
                    body: z.object({
                        name: z.string().trim().min(6),
                        description: z.string(),
                        status: z.literal('ACTIVE').or(z.literal('INACTIVE')),
                        drawDate: z
                            .string({ message: 'Data do sorteio' })
                            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data deve ser no formato YYYY-MM-DD' }),
                        drawTime: z
                            .string({ message: 'Hora do sorteio' })
                            .regex(/^\d{2}:\d{2}:\d{2}$/, { message: 'A hora deve ser no formato HH:MM:SS' }),
                        storeId: z.string().uuid()
                    })
                },
            },
            async (request, reply) => {
                const token = await request.jwtVerify() as TokenPayload;

                const tokenUserId = token.sub;

                const {
                    name,
                    description,
                    status,
                    drawDate,
                    drawTime,
                    storeId
                } = request.body;

                const data = await createLotteryUseCase({
                    name,
                    description,
                    status,
                    drawDate,
                    drawTime,
                    storeId
                }, tokenUserId);

                return reply.status(201).send(data);
            }
        )
};