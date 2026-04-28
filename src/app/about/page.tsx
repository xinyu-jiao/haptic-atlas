import { redirect } from "next/navigation";

/** Legacy URL — canonical deck is `/present`. */
export default function AboutRedirectPage() {
  redirect("/present");
}
