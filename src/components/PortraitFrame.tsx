import { useState } from 'react';
import { User } from 'lucide-react';

interface PortraitFrameProps {
  src: string;
  alt: string;
  plateNumber: string;
  lifespan: string;
  aspectClass?: string;
  maxHeightClass?: string;
  parallaxX?: number;
  parallaxY?: number;
  className?: string;
}

export function PortraitFrame({
  src,
  alt,
  plateNumber,
  lifespan,
  aspectClass = 'aspect-[4/4.4]',
  maxHeightClass = 'max-h-[30dvh] sm:max-h-[42dvh] lg:max-h-[54dvh]',
  parallaxX = 0,
  parallaxY = 0,
  className = '',
}: PortraitFrameProps) {
  const [hasError, setHasError] = useState(false);

  const tiltStyle = {
    transform: `perspective(1100px) rotateY(${parallaxX * 3.0}deg) rotateX(${
      parallaxY * -3.0
    }deg)`,
    transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        data-anim="portrait"
        style={tiltStyle}
        className={`relative mx-auto w-full ${aspectClass} ${maxHeightClass} overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-[0_22px_55px_-22px_rgba(220,38,38,0.24)]`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading="eager"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--surface)] p-4 text-center text-[var(--ink-muted)]">
            <User className="h-10 w-10 opacity-40" strokeWidth={1.25} />
            <span className="font-serif text-base italic">{alt}</span>
          </div>
        )}

        {/* Precision tech corner brackets */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-[var(--accent)]/70"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t border-r border-[var(--accent)]/70"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-[var(--accent)]/70"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-[var(--accent)]/70"
        />
      </div>

      <figcaption
        data-anim="caption"
        className="mt-2 flex items-center justify-between gap-4 border-t border-[var(--hairline)] pt-1.5 text-[11px] text-[var(--ink-muted)]"
      >
        <span className="font-mono uppercase tracking-[0.14em] text-[var(--accent)] tabular-nums">
          Plate {plateNumber}
        </span>
        <span className="font-mono text-[11px] text-[var(--ink-subtle)] tabular-nums">
          {lifespan}
        </span>
      </figcaption>
    </figure>
  );
}
