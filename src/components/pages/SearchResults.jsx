import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import ToolGrid from '@/components/organisms/ToolGrid'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'
import { toolService } from '@/services/api/toolService'

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const query = searchParams.get('q') || ''

  const searchTools = async (searchQuery) => {
    if (!searchQuery.trim()) {
      const allTools = await toolService.getAll()
      setTools(allTools)
      return
    }

    try {
      setLoading(true)
      setError('')
      const results = await toolService.search(searchQuery)
      setTools(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchTools(query)
  }, [query])

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery })
  }

  const groupedTools = tools.reduce((acc, tool) => {
    const categoryId = tool.categoryId
    if (!acc[categoryId]) {
      acc[categoryId] = []
    }
    acc[categoryId].push(tool)
    return acc
  }, {})

  const categoryNames = {
    1: 'PDF Tools',
    2: 'Image Tools', 
    3: 'Text & Content',
    4: 'SEO & Website',
    5: 'Financial Calculators',
    6: 'Developer Tools',
    7: 'Daily Utility',
    8: 'India-Specific'
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {query ? `Search Results for "${query}"` : 'All Tools'}
        </h1>
        <p className="text-gray-600 mb-6">
          {query 
            ? `Found ${tools.length} tools matching your search`
            : `Browse all ${tools.length} available tools`
          }
        </p>
        
        <div className="max-w-lg mx-auto">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search from 69+ tools..."
          />
        </div>
      </motion.div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !query 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Tools
        </button>
        {['PDF', 'Image', 'Calculator', 'Text', 'Converter'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleSearch(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              query.toLowerCase() === filter.toLowerCase()
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <Loading type="cards" />
      ) : tools.length > 0 ? (
        <div className="space-y-12">
          {query ? (
            // Show all results for search
            <ToolGrid tools={tools} />
          ) : (
            // Group by category when showing all tools
            Object.entries(groupedTools).map(([categoryId, categoryTools]) => (
              <div key={categoryId}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {categoryNames[categoryId]}
                  </h2>
                  <button
                    onClick={() => navigate(`/category/${categoryId}`)}
                    className="text-primary hover:text-secondary font-medium text-sm flex items-center"
                  >
                    View Category
                    <ApperIcon name="ArrowRight" size={16} className="ml-1" />
                  </button>
                </div>
                <ToolGrid tools={categoryTools} />
              </div>
            ))
          )}
        </div>
      ) : (
        <Empty
          icon="Search"
          title={query ? "No tools found" : "No tools available"}
          message={
            query 
              ? `No tools match "${query}". Try different keywords or browse categories.`
              : "No tools are currently available."
          }
          actionText="Browse Categories"
          onAction={() => navigate('/')}
        />
      )}
    </div>
  )
}

export default SearchResults