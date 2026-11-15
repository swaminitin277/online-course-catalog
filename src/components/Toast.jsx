import { useEffect } from 'react'

export default function Toast({ toast, onClose, onUndo }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  return (
    <div className={`toast-notification toast-${toast.type || 'info'}`} role="status" aria-live="polite">
      <div className="toast-content">
        <span className="toast-icon" aria-hidden="true">
          {toast.type === 'delete' ? '🗑️' : toast.type === 'success' ? '✓' : 'ℹ️'}
        </span>
        <span className="toast-message">{toast.message}</span>
      </div>
      <div className="toast-actions">
        {toast.undoAction && (
          <button type="button" className="toast-undo-btn" onClick={onUndo}>
            Undo
          </button>
        )}
        <button type="button" className="toast-close-btn" onClick={onClose} aria-label="Dismiss notification">
          ×
        </button>
      </div>
    </div>
  )
}
