import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  PERSONALITIES,
  type DisciplineCategory,
} from '../data/slides';
import { DomainMotif } from './DomainMotif';

interface OverviewSlideProps {
  slideNumber: number;
  totalSlides: number;
  onSelectSlide: (index: number) => void;
  parallaxX: number;
  parallaxY: number;
}

const DISCIPLINES: Array<'All' | DisciplineCategory> = [
  'All',
  'Aerospace & Aviation',
  'Electrical & Wireless',
  'Computing & Web',
  'Artificial Intelligence',
  'OUR ALUMNI',
];

export function OverviewSlide({
  slideNumber,
  totalSlides,
  onSelectSlide,
  parallaxX,
  parallaxY,
}: OverviewSlideProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | DisciplineCategory>(
    'All'
  );

  const sortedByBirth = [...PERSONALITIES]
    .sort((a, b) => a.birthYear - b.birthYear)
    .filter((p) =>
      activeFilter === 'All' ? true : p.discipline === activeFilter
    );

  const counts = DISCIPLINES.slice(1).map((disc) => ({
    label: disc as DisciplineCategory,
    count: PERSONALITIES.filter((p) => p.discipline === disc).length,
  }));

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden px-5 pt-4 pb-16 sm:px-10 sm:pt-5 sm:pb-[4.25rem] md:px-14 lg:px-20 lg:pt-6 lg:pb-[4.5rem]">
      <DomainMotif
        discipline="general"
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      {/* Header */}
      <div
        data-anim="kicker"
        className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[var(--hairline)] pb-2.5 text-[11px] text-[var(--ink-muted)] sm:text-xs"
      >
        <div className="font-mono uppercase tracking-[0.16em]">
          <span className="text-[var(--accent)]">Chronological Index</span> · 1847 – 2026
        </div>
        <div className="font-mono uppercase tracking-[0.16em] tabular-nums">
          {slideNumber.toString().padStart(2, '0')} / {totalSlides.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Title + Interactive Discipline Filter Tabs */}
      <div className="relative z-10 mt-3 flex shrink-0 flex-col justify-between gap-2.5 lg:flex-row lg:items-end">
        <div>
          <p
            data-anim="subtitle"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] sm:text-xs"
          >
            Exhibition Synthesis
          </p>
          <h2
            data-anim="heading"
            className="mt-0.5 font-serif text-[clamp(1.5rem,2.6vw,2.3rem)] font-semibold tracking-tight text-[var(--ink)] text-balance"
          >
            Chronology &amp; Disciplines
          </h2>
        </div>

        {/* Functional interactive filter tabs */}
        <div
          data-anim="reveal"
          className="flex flex-wrap items-center gap-1 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-1"
          role="tablist"
          aria-label="Filter pioneers by discipline"
        >
          {DISCIPLINES.map((disc) => {
            const isSelected = activeFilter === disc;
            return (
              <button
                key={disc}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(disc)}
                className={`min-h-[30px] rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer sm:text-xs ${
                  isSelected
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {disc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discipline Distribution Strip */}
      <div
        data-anim="reveal"
        className="relative z-10 mt-3 grid shrink-0 grid-cols-2 gap-3 border-y border-[var(--hairline)] py-2.5 sm:grid-cols-4"
      >
        {counts.map((item) => {
          const pct = Math.round((item.count / PERSONALITIES.length) * 100);
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-baseline justify-between gap-2 text-[11px] sm:text-xs">
                <span className="truncate font-medium text-[var(--ink)]">
                  {item.label}
                </span>
                <span className="font-mono text-[var(--accent)] tabular-nums shrink-0">
                  {item.count}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--surface)]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Chronological Grid — fitted cleanly inside remaining height */}
      <div className="relative z-10 mt-3 flex min-h-0 flex-1 items-center">
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-2.5">
          {sortedByBirth.map((person) => (
            <button
              key={person.id}
              type="button"
              data-anim="reveal"
              onClick={() => onSelectSlide(person.slideNumber - 1)}
              className="group flex items-center gap-2.5 rounded-lg border border-[var(--hairline)] bg-[var(--surface-elevated)] p-2 text-left transition-all duration-200 hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer sm:p-2.5"
            >
              <div className="h-10 w-8 shrink-0 overflow-hidden rounded border border-[var(--hairline)] bg-[var(--surface)] sm:h-12 sm:w-10">
                <img
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[10px] text-[var(--accent)] tabular-nums">
                    {person.birthYear}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="truncate font-serif text-xs font-semibold text-[var(--ink)] sm:text-sm">
                  {person.name}
                </div>
                <div className="hidden truncate text-[11px] text-[var(--ink-muted)] sm:block">
                  {person.field.replace(/\.$/, '')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
