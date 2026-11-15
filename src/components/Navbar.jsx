export default function Navbar({ onOpenAddModal }) {
  return (
    <header className="site-header">
      <nav className="navbar page-width" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="LearnHub home">
          <span className="brand-mark">L</span> LearnHub<span className="brand-dot">.</span>
        </a>
        <div className="nav-links">
          <a className="active" href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#about">About</a>
        </div>
        <div className="nav-actions">
          <button
            type="button"
            className="nav-add-btn"
            onClick={onOpenAddModal}
            id="nav-add-course-btn"
          >
            <span aria-hidden="true">+</span> Add Course
          </button>
          <a className="nav-cta" href="#courses">
            Explore courses <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
