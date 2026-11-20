import { RotateCcw, Grid } from 'lucide-react';
import { PERSONALITIES } from '../data/slides';
import { DomainMotif } from './DomainMotif';

interface ClosingSlideProps {
  totalSlides: number;
  onRestart: () => void;
  onOpenIndex: () => void;
  onSelectSlide: (index: number) => void;
  parallaxX: number;
  parallaxY: number;
}

export function ClosingSlide({
  totalSlides,
  onRestart,
  onOpenIndex,
  onSelectSlide,
  parallaxX,
  parallaxY,
}: ClosingSlideProps) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden px-5 pt-4 pb-16 sm:px-10 sm:pt-6 sm:pb-[4.25rem] md:px-14 lg:px-20 lg:pt-7 lg:pb-[4.5rem]">
      <DomainMotif
        discipline="general"
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      {/* Header */}
      <div
        data-anim="kicker"
        className="relative z-10 flex shrink-0 items-center justify-between border-b border-[var(--hairline)] pb-2.5 text-[11px] text-[var(--ink-muted)] sm:text-xs"
      >
        <span className="font-mono uppercase tracking-[0.16em] text-[var(--accent)]">
          Conclusion
        </span>
        <span className="font-mono uppercase tracking-[0.16em] tabular-nums">
          {totalSlides.toString().padStart(2, '0')} /{' '}
          {totalSlides.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Center Tribute */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center py-2 text-center">
        <p
          data-anim="subtitle"
          className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)] sm:text-xs"
        >
          Engineering and Technology · Famous Personalities
        </p>

        <h2
          data-anim="heading"
          className="mt-2.5 font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-none tracking-tight text-[var(--ink)] text-balance"
        >
          Thank You
        </h2>

        <div
          data-anim="divider"
          className="my-4 h-[2px] w-20 bg-[var(--accent)] sm:my-5"
        />

        <p
          data-anim="lead"
          className="max-w-xl text-sm leading-relaxed text-[var(--ink-muted)] sm:text-base"
        >
          Honouring {PERSONALITIES.length} pioneers and inspiring alumni whose dedication
          shaped aerospace, electrical power, wireless communications, computing,
          and artificial intelligence.
        </p>

        {/* Portrait Strip */}
        <div
          data-anim="mosaic"
          className="mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-1.5 sm:mt-6 sm:gap-2"
        >
          {PERSONALITIES.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() => onSelectSlide(person.slideNumber - 1)}
              title={person.name}
              className="h-9 w-9 overflow-hidden rounded-full border border-[var(--hairline-accent)] bg-[var(--surface)] transition-transform duration-200 hover:scale-110 hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer sm:h-11 sm:w-11"
            >
              <img
                src={person.image}
                alt={person.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top"
              />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div
          data-anim="actions"
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7"
        >
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_28px_-8px_rgba(220,38,38,0.55)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restart Presentation</span>
          </button>

          <button
            type="button"
            onClick={onOpenIndex}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[var(--hairline)] bg-[var(--surface-elevated)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Grid className="h-4 w-4" />
            <span>View All Slides</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        data-anim="footer"
        className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[var(--hairline)] pt-2.5 text-[11px] text-[var(--ink-subtle)] sm:text-xs"
      >
        <span>{PERSONALITIES.length} Pioneers Featured</span>
        <span className="font-mono tabular-nums">
          Press Home to return to start
        </span>
      </div>
    </div>
  );
}
