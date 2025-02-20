import { prismaClient } from "../../../lib/prisma";
import { BadRequestError } from "../../_errors/bad-request.error";
import * as bcrypt from 'bcrypt';

type SignUpUserParams = {
    name: string;
    email: string;
    password: string;
}

export async function signUpUserUseCase(params: SignUpUserParams) {
    const userWithEmail = await prismaClient.user.findUnique({
        where: {
            email: params.email
        }
    });

    if (userWithEmail) {
        throw new BadRequestError('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(params.password, 6);

    const createdUser = await prismaClient.user.create({
        data: {
            name: params.name,
            email: params.email,
            password: hashedPassword
        }
    })

    return {
        user: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        }
    }
}