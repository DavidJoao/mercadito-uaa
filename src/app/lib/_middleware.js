import { NextResponse } from "next/server";
import { logSession } from "./actions/session";

export default async function middleware(req) {
  const session = await logSession();

  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/home'];

  if (!session && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect('/login');
  }

  if (session && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect('/home');
  }

  return NextResponse.next();
}