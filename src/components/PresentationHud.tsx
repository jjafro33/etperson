import {
  ChevronLeft,
  ChevronRight,
  Grid,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { SLIDES } from '../data/slides';

export type TransitionStyle = 'fade' | 'depth';

interface PresentationHudProps {
  currentIndex: number;
  totalSlides: number;
  isPlaying: boolean;
  isAnimating: boolean;
  autoplayProgress: number; // 0..1
  durationMs: number;
  loopPresentation: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  isDarkTheme: boolean;
  transitionStyle: TransitionStyle;
  isHudVisible: boolean;
  isIndexOpen: boolean;
  isSettingsOpen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onSelectSlide: (index: number) => void;
  onRestart: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onToggleTheme: () => void;
  onChangeDuration: (ms: number) => void;
  onToggleLoop: () => void;
  onChangeTransition: (style: TransitionStyle) => void;
  onToggleIndex: () => void;
  onToggleSettings: () => void;
  onCloseOverlays: () => void;
}

const DURATION_OPTIONS = [
  { label: '5s', ms: 5000 },
  { label: '7s', ms: 7000 },
  { label: '10s', ms: 10000 },
  { label: '15s', ms: 15000 },
];

export function PresentationHud({
  currentIndex,
  totalSlides,
  isPlaying,
  isAnimating,
  autoplayProgress,
  durationMs,
  loopPresentation,
  isMuted,
  isFullscreen,
  isDarkTheme,
  transitionStyle,
  isHudVisible,
  isIndexOpen,
  isSettingsOpen,
  onPrev,
  onNext,
  onTogglePlay,
  onSelectSlide,
  onRestart,
  onToggleMute,
  onToggleFullscreen,
  onToggleTheme,
  onChangeDuration,
  onToggleLoop,
  onChangeTransition,
  onToggleIndex,
  onToggleSettings,
  onCloseOverlays,
}: PresentationHudProps) {
  const overallProgress = ((currentIndex + 1) / totalSlides) * 100;
  const remainingSeconds = Math.max(
    0,
    Math.ceil(((1 - autoplayProgress) * durationMs) / 1000)
  );

  // SVG progress ring geometry
  const ringRadius = 15;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - autoplayProgress);

  const hudShown = isHudVisible || isIndexOpen || isSettingsOpen || !isPlaying;

  return (
    <>
      {/* Top Interactive Slide Progress Track */}
      <div
        className="fixed top-0 right-0 left-0 z-40 h-2 group"
        role="navigation"
        aria-label="Slide progress bar"
      >
        <div className="h-[3px] w-full bg-[var(--hairline)]">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        {/* Clickable segment hit targets */}
        <div className="absolute inset-0 flex">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelectSlide(idx)}
              title={`${slide.slideNumber.toString().padStart(2, '0')}. ${slide.title}`}
              aria-label={`Go to slide ${slide.slideNumber}: ${slide.title}`}
              className="h-3 flex-1 cursor-pointer bg-transparent opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--accent)]/20"
            />
          ))}
        </div>
      </div>

      {/* Floating Bottom Control Dock */}
      <div
        className={`fixed bottom-3 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 sm:bottom-5 ${
          hudShown
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-elevated)]/90 px-2 py-1 shadow-[0_14px_40px_-12px_rgba(0,0,0,0.28)] backdrop-blur-md sm:gap-1.5 sm:px-3">
          {/* Thumbnail Index Button */}
          <button
            type="button"
            onClick={onToggleIndex}
            aria-label="Toggle slide index"
            aria-expanded={isIndexOpen}
            title="Slide Index (G)"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${
              isIndexOpen
                ? 'bg-[var(--ink)] text-[var(--canvas)]'
                : 'text-[var(--ink-muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>

          <div className="h-5 w-px bg-[var(--hairline)]" aria-hidden="true" />

          {/* Previous */}
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
            title="Previous Slide (Left Arrow)"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Play / Pause with Countdown Ring */}
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
            title={
              isPlaying
                ? `Pause Autoplay (${remainingSeconds}s) (P)`
                : 'Start Autoplay (P)'
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--surface)] cursor-pointer"
          >
            <svg
              className="absolute inset-0 h-10 w-10 -rotate-90"
              viewBox="0 0 40 40"
              aria-hidden="true"
            >
              <circle
                cx="20"
                cy="20"
                r={ringRadius}
                fill="none"
                stroke="var(--hairline)"
                strokeWidth="2"
              />
              {isPlaying && (
                <circle
                  cx="20"
                  cy="20"
                  r={ringRadius}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                />
              )}
            </svg>
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 fill-current" />
            ) : (
              <Play className="h-3.5 w-3.5 translate-x-[1px] fill-current" />
            )}
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={onNext}
            disabled={currentIndex === totalSlides - 1 && !loopPresentation}
            aria-label="Next slide"
            title="Next Slide (Right Arrow / Space)"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Slide Counter */}
          <button
            type="button"
            onClick={onToggleIndex}
            className="flex h-10 items-center gap-1.5 rounded-full px-2.5 font-mono text-xs font-medium text-[var(--ink)] tabular-nums transition-colors hover:bg-[var(--surface)] whitespace-nowrap shrink-0 cursor-pointer"
            title="View all slides"
          >
            <span>{(currentIndex + 1).toString().padStart(2, '0')}</span>
            <span className="text-[var(--ink-subtle)]">/</span>
            <span className="text-[var(--ink-muted)]">
              {totalSlides.toString().padStart(2, '0')}
            </span>
            {isPlaying && !isAnimating && (
              <span className="hidden text-[11px] text-[var(--accent)] sm:inline">
                · {remainingSeconds}s
              </span>
            )}
          </button>

          <div className="h-5 w-px bg-[var(--hairline)]" aria-hidden="true" />

          {/* Audio Chime Mute/Unmute */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute transition chime' : 'Mute transition chime'}
            title={isMuted ? 'Unmute Transition Chime' : 'Mute Transition Chime'}
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--ink)] sm:flex cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onToggleSettings}
            aria-label="Presentation settings"
            aria-expanded={isSettingsOpen}
            title="Presentation Settings"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${
              isSettingsOpen
                ? 'bg-[var(--ink)] text-[var(--canvas)]'
                : 'text-[var(--ink-muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'
            }`}
          >
            <Settings className="h-4 w-4" />
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title="Fullscreen (F)"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--ink)] cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Settings Popover */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 p-4 pb-20 backdrop-blur-[2px] sm:items-end sm:justify-center"
          onClick={onCloseOverlays}
        >
          <div
            role="dialog"
            aria-label="Presentation Settings"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-[var(--hairline)] bg-[var(--surface-elevated)] p-5 text-[var(--ink)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
              <h3 className="font-serif text-xl font-semibold">
                Presentation Settings
              </h3>
              <button
                type="button"
                onClick={onCloseOverlays}
                aria-label="Close settings"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              {/* Autoplay Slide Duration */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-medium text-[var(--ink-muted)]">
                  <span>Autoplay Slide Duration</span>
                  <span className="font-mono tabular-nums">
                    {durationMs / 1000}s
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-1">
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.ms}
                      type="button"
                      onClick={() => onChangeDuration(opt.ms)}
                      className={`rounded-md py-1.5 font-mono text-xs font-medium tabular-nums transition-colors cursor-pointer ${
                        durationMs === opt.ms
                          ? 'bg-[var(--surface-elevated)] text-[var(--ink)] shadow-sm'
                          : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--ink-muted)]">
                  Tech Theme
                </span>
                <div className="flex gap-1 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-1">
                  <button
                    type="button"
                    onClick={() => isDarkTheme && onToggleTheme()}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                      !isDarkTheme
                        ? 'bg-[var(--accent)] text-white shadow-sm'
                        : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={() => !isDarkTheme && onToggleTheme()}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                      isDarkTheme
                        ? 'bg-[var(--accent)] text-white shadow-sm'
                        : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    Tech Dark
                  </button>
                </div>
              </div>

              {/* Transition Style */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--ink-muted)]">
                  Slide Transition
                </span>
                <div className="flex gap-1 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-1">
                  <button
                    type="button"
                    onClick={() => onChangeTransition('depth')}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                      transitionStyle === 'depth'
                        ? 'bg-[var(--surface-elevated)] text-[var(--ink)] shadow-sm'
                        : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    3D Depth
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeTransition('fade')}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                      transitionStyle === 'fade'
                        ? 'bg-[var(--surface-elevated)] text-[var(--ink)] shadow-sm'
                        : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    Fade
                  </button>
                </div>
              </div>

              {/* Loop & Sound */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--ink-muted)]">
                  Loop After Final Slide
                </span>
                <button
                  type="button"
                  onClick={onToggleLoop}
                  role="switch"
                  aria-checked={loopPresentation}
                  className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    loopPresentation
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                      : 'border-[var(--hairline)] bg-[var(--surface)] text-[var(--ink-muted)]'
                  }`}
                >
                  {loopPresentation ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between sm:hidden">
                <span className="text-xs font-medium text-[var(--ink-muted)]">
                  Transition Chime
                </span>
                <button
                  type="button"
                  onClick={onToggleMute}
                  className="rounded-md border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--ink)] cursor-pointer"
                >
                  {isMuted ? 'Muted' : 'Active'}
                </button>
              </div>

              {/* Restart Presentation */}
              <div className="border-t border-[var(--hairline)] pt-3">
                <button
                  type="button"
                  onClick={() => {
                    onRestart();
                    onCloseOverlays();
                  }}
                  className="flex w-full min-h-[40px] items-center justify-center gap-2 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--canvas)] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Restart Presentation</span>
                </button>
              </div>

              {/* Shortcuts Legend */}
              <div className="border-t border-[var(--hairline)] pt-3 text-[11px] text-[var(--ink-subtle)]">
                <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono">
                  <span>←/→ Navigate</span>
                  <span>Space Next</span>
                  <span>P Play/Pause</span>
                  <span>F Fullscreen</span>
                  <span>G Index</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail Navigation Drawer */}
      {isIndexOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm sm:p-8"
          onClick={onCloseOverlays}
        >
          <div
            role="dialog"
            aria-label="Slide Index"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[86vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--hairline)] px-5 py-4 sm:px-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold">
                  Presentation Index
                </h3>
                <p className="text-xs text-[var(--ink-muted)]">
                  Select any slide to jump directly
                </p>
              </div>
              <button
                type="button"
                onClick={onCloseOverlays}
                aria-label="Close slide index"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink-muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-y-auto p-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:p-6">
              {SLIDES.map((slide, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => {
                      onSelectSlide(idx);
                      onCloseOverlays();
                    }}
                    className={`group flex flex-col overflow-hidden rounded-xl border text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-[var(--accent)] bg-[var(--surface-elevated)] ring-1 ring-[var(--accent)]'
                        : 'border-[var(--hairline)] bg-[var(--surface-elevated)] hover:border-[var(--ink-muted)]'
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
                      {slide.kind === 'personality' ? (
                        <img
                          src={slide.profile.image}
                          alt={slide.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center">
                          <span className="font-serif text-base font-semibold text-[var(--ink)]">
                            {slide.title}
                          </span>
                        </div>
                      )}
                      <span className="absolute top-2 left-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white tabular-nums">
                        {slide.slideNumber.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <div className="truncate font-serif text-sm font-semibold text-[var(--ink)]">
                        {slide.title}
                      </div>
                      <div className="truncate text-[11px] text-[var(--ink-muted)]">
                        {slide.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
