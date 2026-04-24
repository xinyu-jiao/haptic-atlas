import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/context/SessionContext";
import NavBar from "@/components/NavBar";
import GlobalCameraDock from "@/components/GlobalCameraDock";

export const metadata: Metadata = {
  title: "Haptic Atlas",
  description: "Haptic Navigation Training System — Vertical Slice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NavBar />
          <main>{children}</main>
          <GlobalCameraDock />
        </SessionProvider>
      </body>
    </html>
  );
}
