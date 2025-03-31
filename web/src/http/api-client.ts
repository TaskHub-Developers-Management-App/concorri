import ky from 'ky';

export type APIError = {
    message: string;
}

export const api = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
});