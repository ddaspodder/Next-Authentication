import { NextResponse } from "next/server";
import {
  clearSessionCookie,
  refreshSession,
  validateSession,
} from "./lib/action";

const protectedRoutes = ["/training"];
export async function proxy(req) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  if (isProtectedRoute) {
    const session = await validateSession();
    if (session) await refreshSession();
    else await clearSessionCookie();
  }
  return NextResponse.next();
}
