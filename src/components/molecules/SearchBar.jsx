import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { toolService } from '@/services/api/toolService'

const SearchBar = ({ onSearch, placeholder = "Search tools..." }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const searchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      setLoading(true)
      try {
        const results = await toolService.search(query)
        setSuggestions(results.slice(0, 5))
        setShowSuggestions(true)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`)
      }
      setShowSuggestions(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (tool) => {
    navigate(`/tool/${tool.Id}`)
    setShowSuggestions(false)
    setQuery('')
  }

  return (
    <div className="relative flex-1 max-w-lg">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon name="Search" size={20} className="text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          {loading && (
            <ApperIcon name="Loader2" size={20} className="text-gray-400 animate-spin mr-3" />
          )}
          
          <button
            onClick={handleSearch}
            className="mr-1 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="ArrowRight" size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
          >
            {suggestions.map((tool) => (
              <motion.button
                key={tool.Id}
                whileHover={{ backgroundColor: '#F8FAFC' }}
                onClick={() => handleSuggestionClick(tool)}
                className="w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name={tool.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{tool.name}</div>
                  <div className="text-sm text-gray-500 truncate">{tool.description}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar