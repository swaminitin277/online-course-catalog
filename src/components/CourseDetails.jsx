import { useEffect } from 'react'

export default function CourseDetails({ course, onClose, onDelete }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && course) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [course, onClose])

  if (!course) return null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="course-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Close course details">×</button>
        <div className={`modal-art ${course.accent}`}>
          <span aria-hidden="true">{course.icon}</span>
          <small>{course.category}</small>
        </div>
        <div className="modal-content">
          <span className="eyebrow">A LITTLE MORE ABOUT THIS COURSE</span>
          <h2 id="modal-title">{course.title}</h2>
          <p className="modal-description">{course.description}</p>
          <dl className="detail-list">
            <div><dt>Instructor</dt><dd>{course.instructor}</dd></div>
            <div><dt>Category</dt><dd>{course.category}</dd></div>
            <div><dt>Duration</dt><dd>{course.duration}</dd></div>
            <div><dt>Difficulty</dt><dd>{course.level}</dd></div>
            <div><dt>Price</dt><dd className={course.price === 'Free' ? 'free' : ''}>{course.price}</dd></div>
          </dl>
          <div className="modal-actions-row">
            {onDelete && (
              <button
                type="button"
                className="button button-danger-outline"
                onClick={() => {
                  onClose()
                  onDelete(course)
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Delete Course
              </button>
            )}
            <button type="button" className="button button-primary modal-done" onClick={onClose}>
              Sounds good <span aria-hidden="true">✓</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
