import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { signUpUserUseCase } from "../../usecases/auth/signup-user.usecase";

export function SignUpUserRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/auth/signup',
            {
                schema: {
                    body: z.object({
                        name: z.string().trim().min(2, 'Name must be at least 2 characters long'),
                        email: z.string().email(),
                        password: z.string().min(8)
                    })
                }
            },
            async (request, reply) => {
                const { name, email, password } = request.body;

                const data = await signUpUserUseCase({
                    name,
                    email,
                    password
                });

                return reply.status(200).send(data);
            }
        )
}