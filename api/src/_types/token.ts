export interface TokenPayload {
    sub: string;
    name: string;
    email: string;
    iat: number;
    exp: number;
}