import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Server-side locale-aware redirect and pathname helpers.
// Client navigation uses next/link + next/navigation directly with
// explicit /{locale}/path hrefs — no createNavigation wrappers needed there.
export const { redirect, getPathname } = createNavigation(routing);
