"use server"

import { cookies } from 'next/headers'
import { loginRequest } from "@/http/auth/login.http";
import { HTTPError } from "ky";

type LoginActionData = {
    email: string;
    password: string;
}

export async function loginAction(data: LoginActionData) {
    try {
        const { token } = await loginRequest(data);

        const cookieStore = await cookies();

        cookieStore.set('token', token, {
            maxAge: 60 * 60 // 1 hour
        });

        return {
            success: true,
            message: 'Login realizado com sucesso!'
        }

    } catch (error: any) {

        if (error instanceof HTTPError) {
            const { message } = await error.response.json();

            return {
                success: false,
                message
            }
        }

        return {
            success: false,
            message: 'Erro ao realizar o login!'
        }
    }
}