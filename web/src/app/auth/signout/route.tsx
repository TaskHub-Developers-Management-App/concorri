import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    (await cookies()).delete('token');

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/home';

    return NextResponse.redirect(redirectUrl);
}