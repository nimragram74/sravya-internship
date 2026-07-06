export default function Certificate({ stats }) {
  if (!stats.allDone) {
    return (
      <div className="card cert-locked">
        <div className="lock">🔒</div>
        <h3>Your certificate is waiting</h3>
        <p>
          Finish all {stats.total} days to unlock it. You're at <b>{stats.completed}/{stats.total}</b> ({stats.pct}%). Keep the streak — small and working beats big and broken.
        </p>
      </div>
    )
  }

  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <section className="cert">
      <div className="cert-inner">
        <span className="eyebrow">Certificate of completion</span>
        <h2>The AI Product Builder Internship</h2>
        <p>This certifies that</p>
        <div className="cert-name">Sravya</div>
        <p>
          completed an 8-week mentored internship — mastering Java &amp; OOP, software engineering, databases, and full-stack web development with modern AI tools — and shipped a live, deployed, AI-powered product.
        </p>
        <div className="cert-line">
          <div>Intern signature</div>
          <div>Mentor signature</div>
          <div>{today}</div>
        </div>
      </div>
    </section>
  )
}
