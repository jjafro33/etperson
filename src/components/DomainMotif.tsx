import type { DisciplineCategory } from '../data/slides';

interface DomainMotifProps {
  discipline: DisciplineCategory | 'general';
  parallaxX?: number;
  parallaxY?: number;
}

export function DomainMotif({
  discipline,
  parallaxX = 0,
  parallaxY = 0,
}: DomainMotifProps) {
  const transformStyle = {
    transform: `translate3d(${parallaxX * -14}px, ${parallaxY * -14}px, 0)`,
    transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none text-[var(--accent)] opacity-[0.11] dark:opacity-[0.14]"
      style={transformStyle}
    >
      {discipline === 'Aerospace & Aviation' && (
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle
            cx="1120"
            cy="450"
            r="520"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
          <circle cx="1120" cy="450" r="370" stroke="currentColor" strokeWidth="0.9" />
          <ellipse
            cx="1120"
            cy="450"
            rx="640"
            ry="220"
            transform="rotate(-18 1120 450)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <ellipse
            cx="1120"
            cy="450"
            rx="460"
            ry="150"
            transform="rotate(14 1120 450)"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="3 6"
          />
          <path
            d="M 160 740 Q 640 310 1280 140"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <line x1="1120" y1="60" x2="1120" y2="840" stroke="currentColor" strokeWidth="0.6" />
          <line x1="520" y1="450" x2="1440" y2="450" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="885" cy="246" r="5" fill="currentColor" />
          <circle cx="628" cy="472" r="4" fill="currentColor" />
        </svg>
      )}

      {discipline === 'Electrical & Wireless' && (
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M -60 ${260 + i * 88} Q 180 ${170 + i * 88}, 420 ${260 + i * 88} T 900 ${
                260 + i * 88
              } T 1380 ${260 + i * 88} T 1620 ${260 + i * 88}`}
              stroke="currentColor"
              strokeWidth={i === 2 ? '1.25' : '0.8'}
              strokeDasharray={i % 2 === 1 ? '5 7' : undefined}
            />
          ))}
          <circle cx="1180" cy="440" r="240" stroke="currentColor" strokeWidth="0.85" />
          <circle
            cx="1180"
            cy="440"
            r="160"
            stroke="currentColor"
            strokeWidth="0.85"
            strokeDasharray="4 6"
          />
          <circle cx="1180" cy="440" r="80" stroke="currentColor" strokeWidth="0.85" />
        </svg>
      )}

      {discipline === 'Computing & Web' && (
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 13 }).map((_, idx) => (
            <line
              key={`v-${idx}`}
              x1={idx * 120}
              y1="0"
              x2={idx * 120}
              y2="900"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          ))}
          {Array.from({ length: 9 }).map((_, idx) => (
            <line
              key={`h-${idx}`}
              x1="0"
              y1={idx * 112}
              x2="1440"
              y2={idx * 112}
              stroke="currentColor"
              strokeWidth="0.6"
            />
          ))}
          <path
            d="M 240 224 L 600 224 L 840 448 L 1200 448"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M 360 672 L 600 448 L 960 448 L 1080 224"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeDasharray="5 5"
          />
          <circle cx="600" cy="224" r="6" fill="currentColor" />
          <circle cx="840" cy="448" r="6" fill="currentColor" />
          <circle cx="1200" cy="448" r="6" fill="currentColor" />
        </svg>
      )}

      {discipline === 'Artificial Intelligence' && (
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {[
            [220, 220, 540, 180],
            [220, 220, 540, 420],
            [220, 500, 540, 420],
            [220, 500, 540, 680],
            [540, 180, 920, 300],
            [540, 420, 920, 300],
            [540, 420, 920, 560],
            [540, 680, 920, 560],
            [920, 300, 1240, 430],
            [920, 560, 1240, 430],
          ].map(([x1, y1, x2, y2], idx) => (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.95"
            />
          ))}
          {[
            [220, 220],
            [220, 500],
            [540, 180],
            [540, 420],
            [540, 680],
            [920, 300],
            [920, 560],
            [1240, 430],
          ].map(([cx, cy], idx) => (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="18" stroke="currentColor" strokeWidth="0.9" />
              <circle cx={cx} cy={cy} r="4.5" fill="currentColor" />
            </g>
          ))}
        </svg>
      )}

      {discipline === 'OUR ALUMNI' && (
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle
            cx="1120"
            cy="450"
            r="480"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
          <circle cx="1120" cy="450" r="320" stroke="currentColor" strokeWidth="0.85" />
          <circle
            cx="1120"
            cy="450"
            r="160"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="1120"
              y1="450"
              x2={1120 + 480 * Math.cos((deg * Math.PI) / 180)}
              y2={450 + 480 * Math.sin((deg * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 6"
            />
          ))}
          <circle cx="1120" cy="450" r="7" fill="currentColor" />
          <circle cx="960" cy="310" r="5" fill="currentColor" />
          <circle cx="1280" cy="310" r="5" fill="currentColor" />
          <circle cx="960" cy="590" r="5" fill="currentColor" />
          <circle cx="1280" cy="590" r="5" fill="currentColor" />
          <path
            d="M 200 750 Q 640 400 1120 450"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      )}

      {discipline === 'general' && (
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="720" cy="450" r="410" stroke="currentColor" strokeWidth="0.9" />
          <circle
            cx="720"
            cy="450"
            r="310"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 8"
          />
          <circle cx="720" cy="450" r="210" stroke="currentColor" strokeWidth="0.7" />
          <line x1="720" y1="0" x2="720" y2="900" stroke="currentColor" strokeWidth="0.6" />
          <line x1="0" y1="450" x2="1440" y2="450" stroke="currentColor" strokeWidth="0.6" />
        </svg>
      )}
    </div>
  );
}
