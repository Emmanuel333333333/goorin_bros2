import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)"
]);

export default clerkMiddleware((auth, req) => {
  // rutas públicas
  if (isPublicRoute(req)) return;

  // proteger rutas privadas
  auth().protect(); // ya no se usa await aquí ni devuelve promesa
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
