import { redirect } from "next/navigation";

/** Root URL → Present deck (server redirect so we never sit on a client-only "Loading" shell). */
export default function Home() {
  redirect("/present");
}
