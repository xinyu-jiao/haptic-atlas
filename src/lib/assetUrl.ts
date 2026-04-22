/** Full-color primary lockup: mark + HAPTIC ATLAS + tagline. */
export const MAIN_LOGO_PATH = "/images/haptic_atlas_main_logo_editable_v2.svg";
/** Same mark + type, dark text for light / off-white panels (e.g. About spec hero). */
export const MAIN_LOGO_LIGHT_BG_PATH = "/images/haptic_atlas_main_logo_light_bg.svg";
/** Dot-matrix + chevron only (no wordmark). */
export const LOGO_MARK_PATH = "/images/haptic_atlas_mark.svg";
/** Monochrome mark for one-color / documentation (black on light). */
export const LOGO_MARK_MONO_PATH = "/images/haptic_atlas_mark_mono.svg";
function publicBase() {
  return (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
}

export function assetUrl(href: string) {
  const b = publicBase();
  const p = href.startsWith("/") ? href : `/${href}`;
  return b ? `${b}${p}` : p;
}
