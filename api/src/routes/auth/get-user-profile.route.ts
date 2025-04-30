import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { GetUserByIdUseCase } from "../../usecases/auth/get-user-by-id.usecase";
import type { TokenPayload } from "../../_types/token";

export function GetUserProfileRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get(
            '/auth/profile',
            {
                schema: {
                    response: {
                        200: z.object({
                            user: z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                                email: z.string().email(),
                                createdAt: z.date(),
                                updatedAt: z.date()
                            })
                        }),
                        401: z.object({
                            message: z.string()
                        })
                    }
                }
            },
            async (request, reply) => {
                try {
                    await request.jwtVerify();

                    const userId = (request.user as TokenPayload).sub;

                    return await GetUserByIdUseCase(userId);

                } catch (error) {
                    return reply.status(401).send({
                        message: 'Credenciais inválidas ou token ausente'
                    });
                }
            }
        )
}
