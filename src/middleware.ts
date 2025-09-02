import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
