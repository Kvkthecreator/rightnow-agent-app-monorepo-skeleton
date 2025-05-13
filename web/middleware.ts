import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = req.cookies.get('sb-access-token');

  const protectedPaths = ['/demo'];
  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/demo/:path*'],
};