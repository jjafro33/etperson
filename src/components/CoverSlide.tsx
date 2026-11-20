import { Play, Grid, ArrowRight } from 'lucide-react';
import { PERSONALITIES } from '../data/slides';
import { DomainMotif } from './DomainMotif';

interface CoverSlideProps {
  totalSlides: number;
  onStartPresentation: () => void;
  onNextSlide: () => void;
  onOpenIndex: () => void;
  onSelectSlide: (index: number) => void;
  parallaxX: number;
  parallaxY: number;
}

export function CoverSlide({
  totalSlides,
  onStartPresentation,
  onNextSlide,
  onOpenIndex,
  onSelectSlide,
  parallaxX,
  parallaxY,
}: CoverSlideProps) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden px-5 pt-4 pb-16 sm:px-10 sm:pt-6 sm:pb-[4.25rem] md:px-14 lg:px-20 lg:pt-7 lg:pb-[4.5rem]">
      <DomainMotif
        discipline="general"
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      {/* Top header bar */}
      <div
        data-anim="kicker"
        className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[var(--hairline)] pb-2.5 text-[11px] text-[var(--ink-muted)] sm:text-xs"
      >
        <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.18em]">
          <span className="text-[var(--accent)]">Tech Archive</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">1847 — 2026</span>
        </div>
        <div className="font-mono uppercase tracking-[0.16em] tabular-nums">
          01 / {totalSlides.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Main focal anchor */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center py-2 sm:py-4">
        <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p
              data-anim="subtitle"
              className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent)] sm:text-sm"
            >
              Famous Personalities
            </p>

            <h1
              data-anim="heading"
              className="mt-2.5 font-serif text-[clamp(2.15rem,4.8vw,4.35rem)] font-semibold leading-[1.03] tracking-tight text-[var(--ink)] text-balance"
            >
              Engineering and Technology
            </h1>

            <div
              data-anim="divider"
              className="my-4 h-[2px] w-20 origin-left bg-[var(--accent)] sm:my-5"
            />

            <p
              data-anim="lead"
              className="max-w-xl text-sm leading-relaxed text-[var(--ink-muted)] sm:text-base"
            >
              A curated presentation profiling {PERSONALITIES.length} pioneers and
              distinguished alumni across aerospace, electrical power, wireless communications,
              computing, and artificial intelligence.
            </p>

            {/* Primary CTAs */}
            <div
              data-anim="actions"
              className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3"
            >
              <button
                type="button"
                onClick={onStartPresentation}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_28px_-8px_rgba(220,38,38,0.55)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Start Presentation</span>
              </button>

              <button
                type="button"
                onClick={onNextSlide}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[var(--hairline)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Begin Manually</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenIndex}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Grid className="h-4 w-4" />
                <span>Slide Index</span>
              </button>
            </div>
          </div>

          {/* Interactive curated portrait mosaic preview */}
          <div className="lg:col-span-5">
            <div
              data-anim="mosaic"
              className="rounded-xl border border-[var(--hairline-accent)] bg-[var(--surface-elevated)]/90 p-3.5 backdrop-blur-sm sm:p-4"
            >
              <div className="mb-2.5 flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
                <span className="font-mono uppercase tracking-[0.14em] text-[var(--accent)]">
                  Featured Pioneers
                </span>
                <span className="font-mono tabular-nums">Select to jump</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-8 lg:grid-cols-4 sm:gap-2">
                {PERSONALITIES.map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => onSelectSlide(person.slideNumber - 1)}
                    title={`${person.slideNumber.toString().padStart(2, '0')}. ${person.name}`}
                    className="group relative aspect-square overflow-hidden rounded-md border border-[var(--hairline)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer"
                  >
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="eager"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top grayscale-[25%] transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="sr-only">{person.name}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => onSelectSlide(totalSlides - 2)}
                  title={`${(totalSlides - 1).toString().padStart(2, '0')}. Chronology & Disciplines`}
                  className="flex aspect-square flex-col items-center justify-center rounded-md border border-[var(--hairline-accent)] bg-[var(--surface)] text-center text-[var(--ink-muted)] transition-colors hover:bg-[var(--accent)] hover:text-white cursor-pointer"
                >
                  <span className="font-mono text-xs font-medium tabular-nums">
                    +{PERSONALITIES.length}
                  </span>
                  <span className="text-[10px]">Index</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom archival summary strip */}
      <div
        data-anim="footer"
        className="relative z-10 grid shrink-0 grid-cols-3 gap-4 border-t border-[var(--hairline)] pt-3"
      >
        <div>
          <div className="font-serif text-xl font-semibold text-[var(--ink)] tabular-nums sm:text-2xl">
            {PERSONALITIES.length}
          </div>
          <div className="text-[11px] text-[var(--ink-muted)] sm:text-xs">
            Pioneers &amp; Alumni
          </div>
        </div>
        <div>
          <div className="font-serif text-xl font-semibold text-[var(--ink)] tabular-nums sm:text-2xl">
            5
          </div>
          <div className="text-[11px] text-[var(--ink-muted)] sm:text-xs">
            Featured Categories
          </div>
        </div>
        <div>
          <div className="font-serif text-xl font-semibold text-[var(--ink)] tabular-nums sm:text-2xl">
            1847–2026
          </div>
          <div className="text-[11px] text-[var(--ink-muted)] sm:text-xs">
            Chronological Span
          </div>
        </div>
      </div>
    </div>
  );
}
