/**
 * Bottom camera dock: only on Interface (START) and the in-app session flow — not on Present, Map, etc.
 */
export function isCameraSessionRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.split("?")[0].split("#")[0];
  const n = path.replace(/\/+$/, "") || "/";
  if (n === "/interface" || /(^|\/)(interface)$/.test(n)) return true;
  if (n.startsWith("/session/") || n === "/session") return true;
  return false;
}
