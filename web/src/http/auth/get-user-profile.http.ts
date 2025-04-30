import { api } from "../api-client";

type GetUserProfileResponse = {
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    }
}

export async function getUserProfileRequest() {
    const result = await api.get('auth/profile').json<GetUserProfileResponse>();
    return result;
}