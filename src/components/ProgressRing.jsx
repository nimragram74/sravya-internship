// A simple SVG donut showing overall completion.
export default function ProgressRing({ pct, size = 150, stroke = 12 }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${pct}% complete`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2e5344" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7fd3ac" />
          <stop offset="100%" stopColor="#0f7a52" />
        </linearGradient>
      </defs>
      <text x="50%" y="49%" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize={size * 0.26} fontWeight="700" fill="#ffffff">
        {pct}%
      </text>
      <text x="50%" y="65%" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize={size * 0.085} letterSpacing="1.5" fill="#7fd3ac">
        COMPLETE
      </text>
    </svg>
  )
}
