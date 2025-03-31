"use server"

import { loginRequest } from "@/http/login.http";
import { HTTPError } from "ky";

type LoginActionData = {
    email: string;
    password: string;
}

export async function loginAction(data: LoginActionData) {
    try {
        await loginRequest(data);

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