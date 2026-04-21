import { permanentRedirect } from "next/navigation";

/** Process / timeline now lives on About; keep route for bookmarks. */
export default function IterationsPage() {
  permanentRedirect("/about#iteration-process");
}
