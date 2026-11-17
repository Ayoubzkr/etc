import Image from "next/image";
import { images, type ImageKey } from "@/content/images";
import { cn } from "@/lib/utils";

/** Fills its (relatively positioned) parent with a photograph from the central image config. */
export function Photo({
  name,
  sizes,
  className,
  priority = false,
  alt,
}: {
  name: ImageKey;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Override (use "" when the image is purely decorative in context). */
  alt?: string;
}) {
  const image: (typeof images)[ImageKey] & { position?: string } = images[name];
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      style={{ objectPosition: image.position }}
    />
  );
}
