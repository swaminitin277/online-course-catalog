import { useState, useEffect } from 'react'

const ACCENT_COLORS = [
  { id: 'purple', label: 'Purple', bg: '#f0edff', dot: '#8a7be8' },
  { id: 'blue', label: 'Blue', bg: '#edf4ff', dot: '#5b9df8' },
  { id: 'green', label: 'Green', bg: '#e9f7ee', dot: '#48bb78' },
  { id: 'yellow', label: 'Yellow', bg: '#fff6df', dot: '#ecc94b' },
  { id: 'orange', label: 'Orange', bg: '#fff0e5', dot: '#ed8936' },
  { id: 'pink', label: 'Pink', bg: '#eaf5fa', dot: '#4299e1' },
  { id: 'rose', label: 'Rose', bg: '#fff0f1', dot: '#f56565' },
  { id: 'slate', label: 'Slate', bg: '#eff1f6', dot: '#718096' }
]

const EMOJI_PRESETS = ['🌐', '⚛️', '💻', '🐍', '📱', '🎨', '📊', '🚀', '🧰', '⚡', '🧠', '☕', '💼', '🔬', '🛡️', '🤖']

const DURATION_PRESETS = ['3 weeks', '4 weeks', '6 weeks', '8 weeks', '10 weeks', '12 weeks', 'Self-paced']

export default function AddCourseModal({ isOpen, onClose, onAddCourse, existingCategories }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Web Development')
  const [customCategory, setCustomCategory] = useState('')
  const [isCustomCategory, setIsCustomCategory] = useState(false)
  const [instructor, setInstructor] = useState('')
  const [duration, setDuration] = useState('6 weeks')
  const [level, setLevel] = useState('Beginner')
  const [isFree, setIsFree] = useState(false)
  const [priceNumber, setPriceNumber] = useState('29')
  const [icon, setIcon] = useState('💻')
  const [accent, setAccent] = useState('purple')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setCategory(existingCategories.find(c => c !== 'All Courses') || 'Web Development')
      setCustomCategory('')
      setIsCustomCategory(false)
      setInstructor('')
      setDuration('6 weeks')
      setLevel('Beginner')
      setIsFree(false)
      setPriceNumber('29')
      setIcon('💻')
      setAccent('purple')
      setDescription('')
      setErrors({})
    }
  }, [isOpen, existingCategories])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const resolvedCategory = isCustomCategory ? customCategory.trim() : category
  const resolvedPrice = isFree ? 'Free' : (priceNumber.trim() ? (priceNumber.startsWith('$') ? priceNumber : `$${priceNumber}`) : 'Free')

  function handleCategoryChange(value) {
    if (value === '__custom__') {
      setIsCustomCategory(true)
    } else {
      setIsCustomCategory(false)
      setCategory(value)
    }
  }

  function validate() {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Course title is required'
    if (isCustomCategory && !customCategory.trim()) newErrors.category = 'Please enter a category name'
    if (!instructor.trim()) newErrors.instructor = 'Instructor name is required'
    if (!duration.trim()) newErrors.duration = 'Course duration is required'
    if (!isFree && !priceNumber.trim()) newErrors.price = 'Please specify a price or select Free'
    if (!description.trim()) newErrors.description = 'Course description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const newCourse = {
      id: Date.now(),
      title: title.trim(),
      category: resolvedCategory || 'General',
      instructor: instructor.trim(),
      duration: duration.trim(),
      level,
      price: resolvedPrice,
      icon: icon.trim() || '📚',
      accent,
      description: description.trim()
    }

    onAddCourse(newCourse)
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="course-modal add-course-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-modal-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>

        <div className="add-modal-header">
          <span className="eyebrow"><span className="eyebrow-dot" /> NEW CATALOG ITEM</span>
          <h2 id="add-modal-title">Add a New Course</h2>
          <p className="modal-subheading">Fill in the course details below. See the real-time preview update as you type.</p>
        </div>

        <div className="add-modal-body">
          {/* Live Preview Column */}
          <div className="preview-column">
            <span className="preview-label">LIVE CARD PREVIEW</span>
            <article className="course-card preview-card">
              <div className={`course-art ${accent}`}>
                <span className="course-emoji" aria-hidden="true">{icon || '📚'}</span>
                <span className="course-category">{resolvedCategory || 'Category'}</span>
              </div>
              <div className="course-content">
                <div className="course-meta">
                  <span>{level}</span>
                  <span className="meta-separator">·</span>
                  <span>{duration || 'Duration'}</span>
                </div>
                <h3>{title || 'Course Title will appear here'}</h3>
                <p className="instructor">with <strong>{instructor || 'Instructor Name'}</strong></p>
                <div className="course-card-bottom">
                  <span className={`price ${resolvedPrice === 'Free' ? 'free' : ''}`}>{resolvedPrice}</span>
                  <span className="details-link preview-link">
                    View details <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
            <p className="preview-hint">This card will appear in the catalog instantly upon saving.</p>
          </div>

          {/* Form Column */}
          <form className="add-course-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="course-title">Course Title *</label>
              <input
                id="course-title"
                type="text"
                placeholder="e.g. Full-Stack Web Development Bootcamp"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (errors.title) setErrors(prev => ({ ...prev, title: null }))
                }}
                className={errors.title ? 'has-error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="course-category">Category *</label>
                <select
                  id="course-category"
                  value={isCustomCategory ? '__custom__' : category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {existingCategories.filter(c => c !== 'All Courses').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="__custom__">+ Add Custom Category...</option>
                </select>
                {isCustomCategory && (
                  <input
                    type="text"
                    placeholder="Enter custom category"
                    className={`custom-cat-input ${errors.category ? 'has-error' : ''}`}
                    value={customCategory}
                    onChange={(e) => {
                      setCustomCategory(e.target.value)
                      if (errors.category) setErrors(prev => ({ ...prev, category: null }))
                    }}
                    autoFocus
                  />
                )}
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="course-instructor">Instructor *</label>
                <input
                  id="course-instructor"
                  type="text"
                  placeholder="e.g. Maya Patel"
                  value={instructor}
                  onChange={(e) => {
                    setInstructor(e.target.value)
                    if (errors.instructor) setErrors(prev => ({ ...prev, instructor: null }))
                  }}
                  className={errors.instructor ? 'has-error' : ''}
                />
                {errors.instructor && <span className="error-message">{errors.instructor}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="course-duration">Duration *</label>
                <input
                  id="course-duration"
                  type="text"
                  placeholder="e.g. 6 weeks"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value)
                    if (errors.duration) setErrors(prev => ({ ...prev, duration: null }))
                  }}
                  className={errors.duration ? 'has-error' : ''}
                />
                <div className="pill-suggestions">
                  {DURATION_PRESETS.slice(0, 4).map(d => (
                    <button
                      key={d}
                      type="button"
                      className={`pill-chip ${duration === d ? 'active' : ''}`}
                      onClick={() => setDuration(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                {errors.duration && <span className="error-message">{errors.duration}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="course-level">Difficulty Level</label>
                <select
                  id="course-level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Price</label>
              <div className="price-inputs">
                <button
                  type="button"
                  className={`price-toggle ${isFree ? 'active' : ''}`}
                  onClick={() => setIsFree(true)}
                >
                  Free Course
                </button>
                <button
                  type="button"
                  className={`price-toggle ${!isFree ? 'active' : ''}`}
                  onClick={() => setIsFree(false)}
                >
                  Paid
                </button>
                {!isFree && (
                  <div className="price-custom-input">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="29"
                      value={priceNumber}
                      onChange={(e) => {
                        setPriceNumber(e.target.value)
                        if (errors.price) setErrors(prev => ({ ...prev, price: null }))
                      }}
                      className={errors.price ? 'has-error' : ''}
                    />
                  </div>
                )}
              </div>
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Card Accent Theme</label>
                <div className="swatch-grid" role="radiogroup" aria-label="Accent color">
                  {ACCENT_COLORS.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      className={`swatch-btn ${accent === c.id ? 'active' : ''}`}
                      style={{ background: c.bg, borderColor: accent === c.id ? c.dot : 'transparent' }}
                      onClick={() => setAccent(c.id)}
                      title={c.label}
                      aria-label={c.label}
                    >
                      <span className="swatch-dot" style={{ background: c.dot }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="custom-icon">Course Emoji Icon</label>
                <div className="emoji-picker-row">
                  <input
                    id="custom-icon"
                    type="text"
                    maxLength={4}
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="custom-emoji-input"
                    placeholder="Icon"
                  />
                  <div className="emoji-quick-list">
                    {EMOJI_PRESETS.slice(0, 8).map(em => (
                      <button
                        key={em}
                        type="button"
                        className={`emoji-btn ${icon === em ? 'active' : ''}`}
                        onClick={() => setIcon(em)}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="course-description">Course Description *</label>
              <textarea
                id="course-description"
                rows={3}
                placeholder="Give learners a compelling summary of what they will explore and build in this course..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  if (errors.description) setErrors(prev => ({ ...prev, description: null }))
                }}
                className={errors.description ? 'has-error' : ''}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-actions">
              <button type="button" className="button button-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Add Course to Catalog <span aria-hidden="true">+</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
