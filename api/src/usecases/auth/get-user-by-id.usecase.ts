import { prismaClient } from "../../../lib/prisma";
import { UnauthorizedError } from "../../_errors/unauthorized.error";

export async function GetUserByIdUseCase(id: string) {
    const user = await prismaClient.user.findUnique({
        where: {
            id
        }
    });

    if (!user) {
        throw new UnauthorizedError('Usuário não encontrado!');
    }

    return { user }
}