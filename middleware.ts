import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const privateRoutes = [
  "/project/create",
  // Expressão regular para /project/[id]/edit
  /^\/project\/[^\/]+\/edit$/,
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login-user";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Verifica se a rota é privada
  const isPrivate = privateRoutes.some((route) =>
    typeof route === "string" ? route === path : route.test(path)
  );

  const authToken = request.cookies.get("token")?.value;

  if (isPrivate && !authToken) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    // Mantém a proteção para arquivos estáticos e API
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.[^/]+$).*)",
  ],
};
