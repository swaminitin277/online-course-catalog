import CourseCard from './CourseCard.jsx'

export default function CourseList({
  courses,
  totalCount,
  categories,
  selectedCategory,
  onCategoryChange,
  onViewDetails,
  onDelete,
  onOpenAddModal,
  onResetDefaults,
  onClearFilters,
  isCustomized
}) {
  return (
    <section className="catalog-section" id="courses">
      <div className="section-heading">
        <div className="heading-text">
          <span className="eyebrow">A GOOD PLACE TO BEGIN</span>
          <h2>Find your next <span>favorite.</span></h2>
          <p>Curious minds welcome. Discover, create, and manage your courses.</p>
        </div>

        <div className="section-controls">
          <label className="filter-label">
            Browse by topic
            <select
              value={selectedCategory}
              onChange={(event) => onCategoryChange(event.target.value)}
              aria-label="Filter courses by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="button button-primary add-course-btn"
            onClick={onOpenAddModal}
            id="add-course-btn"
          >
            <span className="plus-sign" aria-hidden="true">+</span> Add Course
          </button>
        </div>
      </div>

      <div className="course-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={onViewDetails}
              onDelete={onDelete}
            />
          ))
        ) : totalCount === 0 ? (
          <div className="empty-state">
            <span aria-hidden="true">📚</span>
            <h3>No courses in catalog</h3>
            <p>You've cleared all the courses. You can add a fresh one or restore the original sample courses.</p>
            <div className="empty-state-actions">
              <button type="button" className="button button-primary" onClick={onOpenAddModal}>
                <span aria-hidden="true">+</span> Add First Course
              </button>
              <button type="button" className="button button-outline" onClick={onResetDefaults}>
                Restore Sample Courses
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">🔎</span>
            <h3>No courses found just yet</h3>
            <p>Try another title or choose a different topic to keep exploring.</p>
            <div className="empty-state-actions">
              <button type="button" className="button button-outline" onClick={onClearFilters}>
                Clear Search & Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="catalog-footer-row">
        <p className="catalog-count">
          Showing <strong>{courses.length}</strong> {courses.length === 1 ? 'course' : 'courses'}
          {totalCount !== courses.length && ` (filtered from ${totalCount} total)`}
        </p>

        {isCustomized && (
          <button
            type="button"
            className="restore-link-btn"
            onClick={onResetDefaults}
            title="Reset courses to initial defaults"
          >
            <span aria-hidden="true">↺</span> Restore default sample courses
          </button>
        )}
      </div>
    </section>
  )
}
