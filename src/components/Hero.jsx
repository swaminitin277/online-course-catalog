export default function Hero({ searchTerm, onSearchChange, onBrowse }) {
  return (
    <section className="hero page-width" id="home">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</span>
        <h1>Discover your<br />next <span>course.</span></h1>
        <p className="hero-description">Small steps lead to big things. Find a course that sparks your curiosity and learn something you'll love.</p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={onBrowse}>Browse courses <span aria-hidden="true">↓</span></button>
          <a className="text-link" href="#about">How LearnHub works <span aria-hidden="true">→</span></a>
        </div>
        <div className="learner-note"><div className="avatar-stack"><span>M</span><span>J</span><span>A</span><span>+</span></div><p><strong>A little learning goes a long way.</strong><br />Pick a topic and get started today.</p></div>
      </div>
      <div className="hero-art" aria-label="Illustration of a learner studying" role="img">
        <div className="art-spark spark-one">✳</div><div className="art-spark spark-two">✦</div>
        <div className="art-sun" />
        <div className="art-card card-note"><span className="note-icon">✦</span><div><strong>Keep going!</strong><small>You're doing great</small></div><span className="tiny-check">✓</span></div>
        <div className="art-book"><span>LEARN<br />SOMETHING<br />NEW</span><i /></div>
        <div className="art-person"><div className="person-hair" /><div className="person-head" /><div className="person-body" /><div className="person-arm" /><div className="person-leg" /></div>
        <div className="art-plant"><i /><i /><i /><b /></div>
        <div className="art-floor" />
      </div>
      <form className="hero-search" role="search" onSubmit={(event) => { event.preventDefault(); onBrowse() }}>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <label className="sr-only" htmlFor="course-search">Search courses by title</label>
        <input id="course-search" type="search" placeholder="What would you like to learn?" value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} />
        <button className="search-button" type="submit">Find a course <span aria-hidden="true">→</span></button>
      </form>
    </section>
  )
}
