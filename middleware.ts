import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Applica il middleware a tutte le route tranne:
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /studio (Sanity Studio — fuori dal routing locale)
  // - file statici (es. /favicon.ico, /logo.png)
  matcher: ["/((?!api|_next|_vercel|studio|[^/]+\\.[^/]+).*)"],
};
