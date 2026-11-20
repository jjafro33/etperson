import type { PersonalityProfile } from '../data/slides';
import { DomainMotif } from './DomainMotif';
import { PortraitFrame } from './PortraitFrame';

interface PersonalitySlideProps {
  profile: PersonalityProfile;
  totalSlides: number;
  parallaxX: number;
  parallaxY: number;
}

export function PersonalitySlide({
  profile,
  totalSlides,
  parallaxX,
  parallaxY,
}: PersonalitySlideProps) {
  const plateIndex = (profile.slideNumber - 1).toString().padStart(2, '0');
  const slideIndex = profile.slideNumber.toString().padStart(2, '0');
  const totalStr = totalSlides.toString().padStart(2, '0');

  const details: Array<{ label: string; value: string }> =
    profile.customDetails ?? [
      { label: 'Born', value: profile.born ?? '' },
      { label: 'Education', value: profile.education ?? '' },
      { label: 'Field', value: profile.field },
      { label: 'Achievements', value: profile.achievements },
      {
        label: profile.recognitionLabel ?? 'Recognition',
        value: profile.recognition ?? '',
      },
      ...(profile.died ? [{ label: 'Died', value: profile.died }] : []),
    ];

  const isPortraitRight = profile.layout === 'editorial-right';
  const isFolioSplit = profile.layout === 'folio-split';
  const isArchivalPlate = profile.layout === 'archival-plate';

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden px-5 pt-4 pb-16 sm:px-10 sm:pt-5 sm:pb-[4.25rem] md:px-14 lg:px-20 lg:pt-6 lg:pb-[4.5rem]">
      <DomainMotif
        discipline={profile.discipline}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      {/* Top tech folio bar */}
      <div
        data-anim="kicker"
        className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[var(--hairline)] pb-2.5 text-[11px] text-[var(--ink-muted)] sm:text-xs"
      >
        <div className="flex items-center gap-2 font-mono uppercase tracking-[0.16em]">
          <span className="text-[var(--accent)]">{profile.discipline}</span>
          <span aria-hidden="true">/</span>
          <span className="tabular-nums">{profile.lifespan}</span>
        </div>
        <div className="font-mono uppercase tracking-[0.16em] tabular-nums">
          {slideIndex} / {totalStr}
        </div>
      </div>

      {/* Main Content Area — strictly fitted inside viewport */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center py-2 sm:py-4">
        {isFolioSplit ? (
          <div className="grid w-full grid-cols-1 items-center gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <PortraitFrame
                src={profile.image}
                alt={profile.name}
                plateNumber={plateIndex}
                lifespan={profile.lifespan}
                aspectClass={
                  profile.isLandscapeImage ? 'aspect-[16/10]' : 'aspect-[4/3]'
                }
                maxHeightClass="max-h-[26dvh] sm:max-h-[36dvh] lg:max-h-[52dvh]"
                parallaxX={parallaxX}
                parallaxY={parallaxY}
                className="mx-auto max-w-md lg:max-w-none"
              />
            </div>
            <div className="lg:col-span-6">
              <SlideTypographyHeader profile={profile} />
              <MetadataDefinitionList details={details} />
            </div>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 items-center gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-10">
            <div
              className={`lg:col-span-5 ${
                isPortraitRight ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <div
                className={
                  isArchivalPlate
                    ? 'mx-auto max-w-[260px] rounded-2xl border border-[var(--hairline-accent)] bg-[var(--surface-elevated)] p-2.5 sm:max-w-xs sm:p-3.5 lg:max-w-sm'
                    : 'mx-auto max-w-[240px] sm:max-w-xs lg:max-w-sm'
                }
              >
                <PortraitFrame
                  src={profile.image}
                  alt={profile.name}
                  plateNumber={plateIndex}
                  lifespan={profile.lifespan}
                  aspectClass="aspect-[4/4.3]"
                  maxHeightClass="max-h-[25dvh] sm:max-h-[34dvh] lg:max-h-[52dvh]"
                  parallaxX={parallaxX}
                  parallaxY={parallaxY}
                />
              </div>
            </div>

            <div
              className={`lg:col-span-7 ${
                isPortraitRight ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <SlideTypographyHeader profile={profile} />
              <MetadataDefinitionList details={details} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SlideTypographyHeader({ profile }: { profile: PersonalityProfile }) {
  return (
    <header className="mb-2.5 sm:mb-3.5">
      <p
        data-anim="subtitle"
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] sm:text-xs"
      >
        {profile.field.replace(/\.$/, '')}
      </p>
      <h2
        data-anim="heading"
        className="mt-1 font-serif text-[clamp(1.45rem,2.9vw,2.85rem)] font-semibold leading-[1.08] tracking-tight text-[var(--ink)] text-balance"
      >
        {profile.name}
      </h2>
      <div
        data-anim="divider"
        className="mt-2 h-px w-full origin-left bg-[var(--hairline-accent)] sm:mt-3"
      />
    </header>
  );
}

function MetadataDefinitionList({
  details,
}: {
  details: Array<{ label: string; value: string }>;
}) {
  return (
    <dl className="divide-y divide-[var(--hairline)]">
      {details.map((item) => {
        const isHighlight =
          item.label === 'Achievements' ||
          item.label === 'Achievement' ||
          item.label === 'Recognition' ||
          item.label === 'Special recognition';

        return (
          <div
            key={item.label}
            data-anim="reveal"
            className="grid grid-cols-1 gap-0.5 py-1.5 sm:grid-cols-12 sm:gap-3 sm:py-2"
          >
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--accent)] sm:col-span-3 sm:pt-0.5 sm:text-[11px]">
              {item.label}
            </dt>
            <dd
              className={`text-xs leading-snug sm:col-span-9 sm:text-[clamp(0.82rem,1.05vw,0.96rem)] sm:leading-relaxed ${
                isHighlight
                  ? 'font-medium text-[var(--ink)]'
                  : 'text-[var(--ink-muted)]'
              }`}
            >
              {item.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
