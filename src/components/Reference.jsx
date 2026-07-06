import { tools, groundRules, syllabusMap, promptLibrary, productIdeas } from '../data/curriculum'

export default function Reference() {
  return (
    <>
      <div className="eyebrow">Reference desk</div>
      <h2 className="section-title">Everything you need, in one place</h2>
      <p className="lead">Setup, the ground rules, how the syllabus maps in, prompt starters, and product ideas — come back here whenever you're stuck.</p>

      <section className="block">
        <div className="eyebrow">Do this first</div>
        <h3 className="section-title" style={{ fontSize: 21 }}>Tools &amp; installation (one-time, all free)</h3>
        <div className="igrid">
          {tools.map((t) => (
            <div className="card icard" key={t.name}>
              <div className="icard-top">
                <h4>{t.name}</h4>
                <span className="irole">{t.role}</span>
              </div>
              <ol className="steps">
                {t.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="eyebrow">Non-negotiables</div>
        <h3 className="section-title" style={{ fontSize: 21 }}>Ground rules: learn with AI, don't hide behind it</h3>
        <div className="rules">
          {groundRules.map((r) => (
            <div className="rule" key={r.title}>
              <h4>{r.title}</h4>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="eyebrow">Why this maps to the syllabus</div>
        <h3 className="section-title" style={{ fontSize: 21 }}>Semester III subjects → internship weeks</h3>
        <table>
          <thead>
            <tr>
              <th style={{ width: 96 }}>Code</th>
              <th style={{ width: '34%' }}>Subject</th>
              <th>Where it lives</th>
            </tr>
          </thead>
          <tbody>
            {syllabusMap.map((s) => (
              <tr key={s.code}>
                <td className="mono">{s.code}</td>
                <td><b>{s.subject}</b></td>
                <td>{s.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="block">
        <div className="eyebrow">Appendix A</div>
        <h3 className="section-title" style={{ fontSize: 21 }}>Prompt library (copy-paste starters)</h3>
        <table>
          <thead>
            <tr>
              <th style={{ width: 170 }}>When to use</th>
              <th>Prompt</th>
            </tr>
          </thead>
          <tbody>
            {promptLibrary.map((p) => (
              <tr key={p.when}>
                <td className="pcat">{p.when}</td>
                <td className="mono">{p.prompt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="block">
        <div className="eyebrow">Appendix B</div>
        <h3 className="section-title" style={{ fontSize: 21 }}>Product-idea starters (pick one in Week 3)</h3>
        <p className="lead">Choose something she'd actually use. A green or social angle honours the Environmental Science subject and gives the Week-8 pitch real meaning.</p>
        <table>
          <thead>
            <tr>
              <th style={{ width: 170 }}>Theme</th>
              <th>Ideas</th>
            </tr>
          </thead>
          <tbody>
            {productIdeas.map((p) => (
              <tr key={p.theme}>
                <td className="pcat">{p.theme}</td>
                <td>{p.ideas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
