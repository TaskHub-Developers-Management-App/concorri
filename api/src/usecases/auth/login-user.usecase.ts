import { prismaClient } from "../../../lib/prisma";
import { UnauthorizedError } from "../../_errors/unauthorized.error";
import { app } from "../../server";

type LoginUserParams = {
    email: string;
    password: string;
}

export async function LoginUserUseCase(params: LoginUserParams) {
    const user = await prismaClient.user.findUnique({
        where: {
            email: params.email
        }
    });

    if (!user) {
        throw new UnauthorizedError('Crendenciais inválidas!');
    }

    const token = app.jwt.sign(
        {
            sub: user.id,
            name: user.name,
            email: user.email
        },
        {
            expiresIn: '1h'
        }
    );

    return { token }
}