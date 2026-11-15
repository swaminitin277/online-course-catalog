import { useState, useEffect, useMemo } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CourseList from './components/CourseList.jsx'
import CourseDetails from './components/CourseDetails.jsx'
import AddCourseModal from './components/AddCourseModal.jsx'
import DeleteConfirmModal from './components/DeleteConfirmModal.jsx'
import Toast from './components/Toast.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import { categories as defaultCategories, courses as initialCourses } from './data/courses.js'

const STORAGE_KEY = 'learnhub_courses_catalog'

export default function App() {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.warn('Failed to parse saved courses from localStorage', e)
    }
    return initialCourses
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Courses')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState(null)
  const [toast, setToast] = useState(null)

  // Persist course list to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
    } catch (e) {
      console.error('Failed to save courses to localStorage', e)
    }
  }, [courses])

  // Compute dynamic category list: defaults + any newly added categories
  const dynamicCategories = useMemo(() => {
    const set = new Set(defaultCategories)
    courses.forEach(c => {
      if (c.category) set.add(c.category)
    })
    return Array.from(set)
  }, [courses])

  // Check if current list differs from original sample data
  const isCustomized = useMemo(() => {
    if (courses.length !== initialCourses.length) return true
    return courses.some((c, idx) => c.id !== initialCourses[idx]?.id)
  }, [courses])

  // Filter courses by search term and selected category
  const visibleCourses = courses.filter((course) => {
    const matchesTitle = course.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    const matchesCategory = selectedCategory === 'All Courses' || course.category === selectedCategory
    return matchesTitle && matchesCategory
  })

  function handleAddCourse(newCourse) {
    setCourses(prev => [newCourse, ...prev])
    setToast({
      message: `Course "${newCourse.title}" successfully added!`,
      type: 'success'
    })
    // If the new course wouldn't be visible in current category, reset to All Courses
    if (selectedCategory !== 'All Courses' && selectedCategory !== newCourse.category) {
      setSelectedCategory('All Courses')
    }
    // Scroll to catalog section
    setTimeout(() => {
      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  function handleRequestDelete(course) {
    setCourseToDelete(course)
  }

  function handleConfirmDelete(course) {
    const deletedIndex = courses.findIndex(c => c.id === course.id)
    setCourses(prev => prev.filter(c => c.id !== course.id))

    if (selectedCourse?.id === course.id) {
      setSelectedCourse(null)
    }
    setCourseToDelete(null)

    // Offer undo functionality
    setToast({
      message: `Course "${course.title}" was deleted.`,
      type: 'delete',
      undoAction: () => {
        setCourses(prev => {
          const updated = [...prev]
          const targetIndex = deletedIndex >= 0 && deletedIndex <= prev.length ? deletedIndex : 0
          updated.splice(targetIndex, 0, course)
          return updated
        })
        setToast({
          message: `Restored "${course.title}" to catalog.`,
          type: 'success'
        })
      }
    })
  }

  function handleResetDefaults() {
    if (window.confirm('Restore initial sample courses? Any newly added courses will be replaced with the original list.')) {
      setCourses(initialCourses)
      setSelectedCategory('All Courses')
      setSearchTerm('')
      setToast({
        message: 'Catalog reset to original sample courses.',
        type: 'info'
      })
    }
  }

  function handleClearFilters() {
    setSearchTerm('')
    setSelectedCategory('All Courses')
  }

  return (
    <>
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />
      <main>
        <Hero
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onBrowse={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <CourseList
          courses={visibleCourses}
          totalCount={courses.length}
          categories={dynamicCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onViewDetails={setSelectedCourse}
          onDelete={handleRequestDelete}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onResetDefaults={handleResetDefaults}
          onClearFilters={handleClearFilters}
          isCustomized={isCustomized}
        />
        <About />
      </main>
      <Footer />

      {/* Modals & Dialogs */}
      <CourseDetails
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onDelete={handleRequestDelete}
      />

      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCourse={handleAddCourse}
        existingCategories={dynamicCategories}
      />

      <DeleteConfirmModal
        course={courseToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setCourseToDelete(null)}
      />

      {/* Toast notification banner */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onUndo={() => {
          if (toast?.undoAction) {
            toast.undoAction()
          }
        }}
      />
    </>
  )
}
