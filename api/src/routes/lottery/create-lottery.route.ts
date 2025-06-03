import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createLotteryUseCase } from "../../usecases/lottery/create-lottery.usecase";
import { z } from "zod";

export function CreateLotteryRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/lotteries',
            {
                schema: {
                    body: z.object({
                        name: z
                            .string({ message: 'O nome do sorteiro é obrigatório' })
                            .trim()
                            .min(6, { message: 'O nome do sorteio deve ter no mínimo 6 caracteres' })
                            .max(100, { message: 'O nome do sorteio deve ter no máximo 100 caracteres' }),
                        description: z
                            .string({ message: 'A descrição do sorteiro é obrigatório' })
                            .trim()
                            .min(6, { message: 'A descrição do sorteiro deve ter no mínimo 6 caracteres' })
                            .max(255, { message: 'A descrição do sorteiro deve ter no máximo 100 caracteres' }),
                        drawDate: z
                            .string({ message: 'A data do sorteio é obrigatório' })
                            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data deve ser no formato YYYY-MM-DD' }),
                        couponPrice: z
                            .number({ message: 'O valor do cupom é obrigatório' })
                            .min(1, { message: 'O valor mínimo do cupom é de R$ 1,00' })
                    })
                },
            },
            async (request, reply) => {
                await request.jwtVerify();
                const userId = (request.user as any).sub;

                const {
                    name,
                    description,
                    drawDate,
                    couponPrice
                } = request.body;

                const data = await createLotteryUseCase({
                    name,
                    description,
                    drawDate,
                    userId,
                    couponPrice
                });

                return reply.status(201).send(data);
            }
        )
};