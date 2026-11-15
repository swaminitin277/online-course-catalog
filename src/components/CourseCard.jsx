export default function CourseCard({ course, onViewDetails, onDelete }) {
  return (
    <article className="course-card">
      <div className={`course-art ${course.accent}`}>
        <span className="course-category">{course.category}</span>
        {onDelete && (
          <button
            type="button"
            className="card-delete-btn"
            aria-label={`Delete ${course.title}`}
            title="Delete this course"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(course)
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        )}
        <span className="course-emoji" aria-hidden="true">{course.icon}</span>
      </div>
      <div className="course-content">
        <div className="course-meta">
          <span>{course.level}</span>
          <span className="meta-separator">·</span>
          <span>{course.duration}</span>
        </div>
        <h3>{course.title}</h3>
        <p className="instructor">with <strong>{course.instructor}</strong></p>
        <div className="course-card-bottom">
          <span className={`price ${course.price === 'Free' ? 'free' : ''}`}>{course.price}</span>
          <button className="details-link" onClick={() => onViewDetails(course)}>
            View details <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  )
}
