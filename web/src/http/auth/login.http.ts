import { api } from "../api-client";

type LoginPayload = {
    email: string;
    password: string;
}

type LoginResponse = {
    token: string;
}

export async function loginRequest(payload: LoginPayload) {
    const result = await api.post('auth/login', { json: payload }).json<LoginResponse>();
    return result;
}