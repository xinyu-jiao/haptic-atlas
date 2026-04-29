import type { ReactNode } from "react";

/** One full-viewport slide (or tall flow block for long content). */
export default function PresentSlide({
  id,
  flow = false,
  children,
}: {
  id?: string;
  flow?: boolean;
  children: ReactNode;
}) {
  return (
    <article id={id} className={flow ? "present-slide present-slide--flow" : "present-slide"}>
      <div
        className={
          "present-slide__inner dash-container" + (flow ? " present-slide__inner--flow" : "")
        }
      >
        {children}
      </div>
    </article>
  );
}
