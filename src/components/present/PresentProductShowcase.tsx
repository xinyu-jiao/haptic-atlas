import { assetUrl } from "@/lib/assetUrl";

const PRODUCT_IMAGES: { src: string; alt: string }[] = [
  {
    src: "/images/427(3).gif",
    alt: "Assembled belt with hex grid interface, hands-on demo",
  },
  {
    src: "/images/427(4).gif",
    alt: "Product showcase: second wide view",
  },
  {
    src: "/images/product-showcase-hex-sensor-array-top.png",
    alt: "Top view of flexible hex lattice with sensor modules and wiring",
  },
  {
    src: "/images/product-showcase-flex-lattice-hand.png",
    alt: "Flexible hex lattice with actuators, bent to show conformability",
  },
];

/** §08 — Product showcase: full-width stills or GIFs stacked vertically. */
export default function PresentProductShowcase() {
  if (PRODUCT_IMAGES.length === 0) {
    return null;
  }
  return (
    <div className="present-product-showcase" role="list">
      {PRODUCT_IMAGES.map((item) => (
        <figure
          key={item.src}
          className="present-product-showcase__cell"
          role="listitem"
        >
          <img src={assetUrl(item.src)} alt={item.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}
