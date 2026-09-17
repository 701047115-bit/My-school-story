import type { CSSProperties } from "react";
import type { PolaroidPhoto } from "@/lib/story";
import { cn } from "@/lib/utils";

interface PolaroidProps extends PolaroidPhoto {
  testid?: string;
  width?: number;
  className?: string;
}

// A tilted polaroid print with washi tape and a hand-written caption.
// Hover lifts it square — the tilt is applied via a CSS var so the hover
// rotate-0 utility can win the specificity fight.
export function Polaroid({ src, caption, alt, tilt = -2, testid = "polaroid", width = 300, className }: PolaroidProps) {
  return (
    <figure
      data-testid={testid}
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
      className={cn(
        "relative w-fit max-w-full rotate-[var(--tilt)] rounded-sm bg-[#FFFFFC] p-3 shadow-[0_10px_25px_-5px_rgba(43,33,24,0.18),0_4px_6px_-2px_rgba(43,33,24,0.08)] transition-[rotate,scale,translate] duration-300 ease-out hover:-translate-y-2 hover:rotate-0 hover:scale-[1.02]",
        className,
      )}
    >
      <span aria-hidden className="washi-tape absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={width}
        loading="lazy"
        style={{ width }}
        className="block h-auto rounded-[2px] object-cover"
      />
      <figcaption className="px-1 pb-1 pt-3 text-center font-heading text-sm italic text-[#3D312A]">
        {caption}
      </figcaption>
    </figure>
  );
}
