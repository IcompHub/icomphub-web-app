import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  {
    path: "/",
    whenAuthenticated: "redirect",
  },
  {
    path: "/login-user",
    whenAuthenticated: "redirect",
  },
  {
    path: "/sign-up",
    whenAuthenticated: "redirect",
  },
  {
    path: "/project",
    whenAuthenticated: "next",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login-user";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publiRoute = publicRoutes.find((route) => route.path === path);

  const authToken = request.cookies.get("token")?.value;

  if (!authToken) {
    if (publiRoute) return NextResponse.next();
    else {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (authToken && publiRoute && publiRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publiRoute) {
    // verificar se o token é válido

    return NextResponse.next();
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
