import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import gsap from 'gsap';
import { SLIDES } from './data/slides';
import { CoverSlide } from './components/CoverSlide';
import { PersonalitySlide } from './components/PersonalitySlide';
import { OverviewSlide } from './components/OverviewSlide';
import { ClosingSlide } from './components/ClosingSlide';
import {
  PresentationHud,
  type TransitionStyle,
} from './components/PresentationHud';
import { playTransitionChime } from './utils/sound';

const DEFAULT_DURATION_MS = 7000;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [durationMs, setDurationMs] = useState(DEFAULT_DURATION_MS);
  const [loopPresentation, setLoopPresentation] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [transitionStyle, setTransitionStyle] =
    useState<TransitionStyle>('depth');

  const [isHudVisible, setIsHudVisible] = useState(true);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const autoplayProgressRef = useRef(0);

  const totalSlides = SLIDES.length;
  const activeSlide = SLIDES[currentIndex];

  // Sync dark theme class on document root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  // Listen to native fullscreen changes
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const revealHud = useCallback(() => {
    setIsHudVisible(true);
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = window.setTimeout(() => {
      setIsHudVisible(false);
    }, 3500);
  }, []);

  useEffect(() => {
    revealHud();
    return () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [revealHud]);

  const navigateTo = useCallback(
    (
      targetIndex: number,
      options?: { manual?: boolean; dir?: 'next' | 'prev' }
    ) => {
      const clamped = Math.max(0, Math.min(totalSlides - 1, targetIndex));
      if (clamped === currentIndex) return;

      const computedDir =
        options?.dir ?? (clamped > currentIndex ? 'next' : 'prev');

      if (options?.manual) {
        setIsPlaying(false);
      }

      setDirection(computedDir);
      autoplayProgressRef.current = 0;
      setAutoplayProgress(0);
      setCurrentIndex(clamped);
      revealHud();

      if (!isMuted) {
        playTransitionChime(computedDir);
      }
    },
    [currentIndex, totalSlides, isMuted, revealHud]
  );

  const handleManualNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      navigateTo(currentIndex + 1, { manual: true, dir: 'next' });
    } else if (loopPresentation) {
      navigateTo(0, { manual: true, dir: 'next' });
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, totalSlides, loopPresentation, navigateTo]);

  const handleManualPrev = useCallback(() => {
    if (currentIndex > 0) {
      navigateTo(currentIndex - 1, { manual: true, dir: 'prev' });
    }
  }, [currentIndex, navigateTo]);

  const handleAutoAdvance = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      navigateTo(currentIndex + 1, { manual: false, dir: 'next' });
    } else if (loopPresentation) {
      navigateTo(0, { manual: false, dir: 'next' });
    } else {
      setIsPlaying(false);
      autoplayProgressRef.current = 1;
      setAutoplayProgress(1);
    }
  }, [currentIndex, totalSlides, loopPresentation, navigateTo]);

  const handleStartPresentation = useCallback(() => {
    setIsPlaying(true);
    autoplayProgressRef.current = 0;
    setAutoplayProgress(0);
    if (currentIndex === 0) {
      navigateTo(1, { manual: false, dir: 'next' });
    }
    revealHud();
  }, [currentIndex, navigateTo, revealHud]);

  const handleRestart = useCallback(() => {
    setIsPlaying(false);
    autoplayProgressRef.current = 0;
    setAutoplayProgress(0);
    navigateTo(0, { manual: false, dir: 'prev' });
  }, [navigateTo]);

  const handleToggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fallback visual state if browser iframe restricts native fullscreen
      setIsFullscreen((prev) => !prev);
    }
  }, []);

  // GSAP Slide Transition & Staggered Entrance Choreography
  useEffect(() => {
    const container = slideRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      const shiftX = direction === 'next' ? 44 : -44;

      if (transitionStyle === 'depth') {
        tl.fromTo(
          container,
          { opacity: 0, x: shiftX, scale: 0.982, rotationY: direction === 'next' ? 1.8 : -1.8 },
          { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 0.55 }
        );
      } else {
        tl.fromTo(
          container,
          { opacity: 0 },
          { opacity: 1, duration: 0.45 }
        );
      }

      const kicker = container.querySelector('[data-anim="kicker"]');
      const subtitle = container.querySelector('[data-anim="subtitle"]');
      const heading = container.querySelector('[data-anim="heading"]');
      const divider = container.querySelector('[data-anim="divider"]');
      const lead = container.querySelector('[data-anim="lead"]');
      const portrait = container.querySelector('[data-anim="portrait"]');
      const caption = container.querySelector('[data-anim="caption"]');
      const mosaic = container.querySelector('[data-anim="mosaic"]');
      const actions = container.querySelector('[data-anim="actions"]');
      const footer = container.querySelector('[data-anim="footer"]');
      const reveals = container.querySelectorAll('[data-anim="reveal"]');

      if (kicker) {
        tl.fromTo(
          kicker,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.35 },
          0.08
        );
      }

      if (portrait) {
        tl.fromTo(
          portrait,
          { opacity: 0, scale: 0.95, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6 },
          0.12
        );
      }

      if (caption) {
        tl.fromTo(
          caption,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35 },
          0.32
        );
      }

      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.38 },
          0.14
        );
      }

      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.48 },
          0.18
        );
      }

      if (divider) {
        tl.fromTo(
          divider,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.42 },
          0.26
        );
      }

      if (lead) {
        tl.fromTo(
          lead,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.28
        );
      }

      if (reveals.length > 0) {
        tl.fromTo(
          reveals,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.36, stagger: 0.06 },
          0.28
        );
      }

      if (mosaic) {
        tl.fromTo(
          mosaic,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45 },
          0.28
        );
      }

      if (actions) {
        tl.fromTo(
          actions,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.38 },
          0.36
        );
      }

      if (footer) {
        tl.fromTo(
          footer,
          { opacity: 0 },
          { opacity: 1, duration: 0.35 },
          0.4
        );
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [currentIndex, direction, transitionStyle]);

  // Autoplay Timer (waits strictly until entrance animation finishes!)
  useEffect(() => {
    if (!isPlaying || isAnimating || isIndexOpen || isSettingsOpen) {
      return;
    }

    let rafId = 0;
    const startTime =
      performance.now() - autoplayProgressRef.current * durationMs;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      autoplayProgressRef.current = progress;
      setAutoplayProgress(progress);

      if (progress >= 1) {
        handleAutoAdvance();
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [
    isPlaying,
    isAnimating,
    isIndexOpen,
    isSettingsOpen,
    durationMs,
    handleAutoAdvance,
  ]);

  // Keyboard Navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      revealHud();

      if (e.key === 'Escape') {
        if (isIndexOpen || isSettingsOpen) {
          setIsIndexOpen(false);
          setIsSettingsOpen(false);
          return;
        }
      }

      if (isIndexOpen || isSettingsOpen) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          handleManualNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleManualPrev();
          break;
        case 'Home':
          e.preventDefault();
          navigateTo(0, { manual: true, dir: 'prev' });
          break;
        case 'End':
          e.preventDefault();
          navigateTo(totalSlides - 1, { manual: true, dir: 'next' });
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          void handleToggleFullscreen();
          break;
        case 'g':
        case 'G':
          e.preventDefault();
          setIsSettingsOpen(false);
          setIsIndexOpen((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    handleManualNext,
    handleManualPrev,
    navigateTo,
    totalSlides,
    handleToggleFullscreen,
    isIndexOpen,
    isSettingsOpen,
    revealHud,
  ]);

  // Pointer Parallax & HUD Reveal
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      revealHud();
      if (e.pointerType !== 'mouse') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setParallax({ x: nx, y: ny });
    },
    [revealHud]
  );

  // Touch Swipe Navigation
  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    revealHud();
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) {
        handleManualNext();
      } else {
        handleManualPrev();
      }
    }
  };

  return (
    <main
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="tech-backdrop relative h-dvh w-screen overflow-hidden bg-[var(--canvas)] text-[var(--ink)] select-none sm:select-text"
      style={{ perspective: '1400px' }}
    >
      {/* Active Slide Viewport */}
      <div
        key={activeSlide.id}
        ref={slideRef}
        className="h-full w-full will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {activeSlide.kind === 'cover' && (
          <CoverSlide
            totalSlides={totalSlides}
            onStartPresentation={handleStartPresentation}
            onNextSlide={handleManualNext}
            onOpenIndex={() => {
              setIsSettingsOpen(false);
              setIsIndexOpen(true);
            }}
            onSelectSlide={(idx) => navigateTo(idx, { manual: true })}
            parallaxX={parallax.x}
            parallaxY={parallax.y}
          />
        )}

        {activeSlide.kind === 'personality' && (
          <PersonalitySlide
            profile={activeSlide.profile}
            totalSlides={totalSlides}
            parallaxX={parallax.x}
            parallaxY={parallax.y}
          />
        )}

        {activeSlide.kind === 'overview' && (
          <OverviewSlide
            slideNumber={activeSlide.slideNumber}
            totalSlides={totalSlides}
            onSelectSlide={(idx) => navigateTo(idx, { manual: true })}
            parallaxX={parallax.x}
            parallaxY={parallax.y}
          />
        )}

        {activeSlide.kind === 'closing' && (
          <ClosingSlide
            totalSlides={totalSlides}
            onRestart={handleRestart}
            onOpenIndex={() => {
              setIsSettingsOpen(false);
              setIsIndexOpen(true);
            }}
            onSelectSlide={(idx) => navigateTo(idx, { manual: true })}
            parallaxX={parallax.x}
            parallaxY={parallax.y}
          />
        )}
      </div>

      {/* Presentation HUD, Settings & Thumbnail Index */}
      <PresentationHud
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        isPlaying={isPlaying}
        isAnimating={isAnimating}
        autoplayProgress={autoplayProgress}
        durationMs={durationMs}
        loopPresentation={loopPresentation}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        isDarkTheme={isDarkTheme}
        transitionStyle={transitionStyle}
        isHudVisible={isHudVisible}
        isIndexOpen={isIndexOpen}
        isSettingsOpen={isSettingsOpen}
        onPrev={handleManualPrev}
        onNext={handleManualNext}
        onTogglePlay={() => {
          setIsPlaying((prev) => {
            if (!prev && currentIndex === totalSlides - 1 && !loopPresentation && autoplayProgressRef.current >= 1) {
              autoplayProgressRef.current = 0;
              setAutoplayProgress(0);
            }
            return !prev;
          });
          revealHud();
        }}
        onSelectSlide={(idx) => navigateTo(idx, { manual: true })}
        onRestart={handleRestart}
        onToggleMute={() => setIsMuted((prev) => !prev)}
        onToggleFullscreen={() => void handleToggleFullscreen()}
        onToggleTheme={() => setIsDarkTheme((prev) => !prev)}
        onChangeDuration={(ms) => {
          setDurationMs(ms);
          autoplayProgressRef.current = 0;
          setAutoplayProgress(0);
        }}
        onToggleLoop={() => setLoopPresentation((prev) => !prev)}
        onChangeTransition={(style) => setTransitionStyle(style)}
        onToggleIndex={() => {
          setIsSettingsOpen(false);
          setIsIndexOpen((prev) => !prev);
        }}
        onToggleSettings={() => {
          setIsIndexOpen(false);
          setIsSettingsOpen((prev) => !prev);
        }}
        onCloseOverlays={() => {
          setIsIndexOpen(false);
          setIsSettingsOpen(false);
        }}
      />
    </main>
  );
}
