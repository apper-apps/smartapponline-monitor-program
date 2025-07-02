import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { categoryService } from '@/services/api/categoryService'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const Sidebar = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()

  const loadCategories = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const navigationItems = [
    { name: 'Home', icon: 'Home', path: '/' },
    { name: 'All Tools', icon: 'Grid3X3', path: '/search' },
    { name: 'Recent', icon: 'Clock', path: '/recent' },
    { name: 'Favorites', icon: 'Heart', path: '/favorites' }
  ]

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  }

  if (loading) {
    return (
      <div className="lg:block w-64 bg-white border-r border-gray-200 p-6">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="lg:block w-64 bg-white border-r border-gray-200 p-6">
        <Error message={error} onRetry={loadCategories} />
      </div>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 overflow-y-auto"
      >
        <div className="p-6">
          {/* Close button on mobile */}
          <div className="lg:hidden flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Navigation
            </h3>
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-2 border-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <ApperIcon name={item.icon} size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <NavLink
                  key={category.Id}
                  to={`/category/${category.Id}`}
                  onClick={() => onClose?.()}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                      location.pathname === `/category/${category.Id}`
                        ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <div 
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <ApperIcon 
                      name={category.icon} 
                      size={14} 
                      style={{ color: category.color }}
                    />
                  </div>
                  <span className="flex-1 font-medium">{category.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {category.toolCount}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">
                Made with ❤️ for productivity
              </div>
              <div className="text-xs text-gray-400">
                © 2024 SmartAppOnline
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar