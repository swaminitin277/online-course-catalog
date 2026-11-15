import { useEffect } from 'react'

export default function DeleteConfirmModal({ course, onConfirm, onCancel }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onCancel()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  if (!course) return null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <section
        className="course-modal delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <button className="modal-close" onClick={onCancel} aria-label="Cancel delete">
          ×
        </button>
        <div className="delete-modal-header">
          <div className="delete-icon-wrapper" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </div>
          <span className="eyebrow danger-eyebrow">CONFIRM REMOVAL</span>
          <h2 id="delete-dialog-title">Delete this course?</h2>
          <p className="delete-modal-warning">
            Are you sure you want to delete <strong>"{course.title}"</strong>?
          </p>
        </div>

        <div className="delete-preview-item">
          <div className={`delete-preview-art ${course.accent}`}>
            <span aria-hidden="true">{course.icon}</span>
          </div>
          <div className="delete-preview-info">
            <span className="delete-preview-cat">{course.category}</span>
            <h4>{course.title}</h4>
            <p>with {course.instructor} · {course.duration}</p>
          </div>
        </div>

        <div className="delete-modal-actions">
          <button type="button" className="button button-outline" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="button button-danger"
            onClick={() => onConfirm(course)}
            autoFocus
          >
            Yes, Delete Course
          </button>
        </div>
      </section>
    </div>
  )
}
