import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { LoginUserUseCase } from "../../usecases/auth/login-user.usecase";

export function LoginUserRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/auth/login',
            {
                schema: {
                    body: z.object({
                        email: z.string().email(),
                        password: z.string().min(8)
                    })
                }
            },
            async (request, reply) => {
                const { email, password } = request.body;

                const data = await LoginUserUseCase({
                    email,
                    password
                });

                return reply.status(200).send(data);
            }
        )
}