import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import ToolGrid from '@/components/organisms/ToolGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { categoryService } from '@/services/api/categoryService'
import { toolService } from '@/services/api/toolService'

const CategoryView = () => {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [categoryData, toolsData] = await Promise.all([
        categoryService.getById(categoryId),
        toolService.getByCategory(categoryId)
      ])
      setCategory(categoryData)
      setTools(toolsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [categoryId])

  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadData} />
  if (!category) return <Error message="Category not found" />

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <ApperIcon 
              name={category.icon} 
              size={40} 
              style={{ color: category.color }}
            />
          </motion.div>
          
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {category.name}
            </h1>
            <p className="text-lg text-gray-600 mb-3">
              {category.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <ApperIcon name="Package" size={16} className="mr-1" />
                {category.toolCount} tools available
              </span>
              <span className="flex items-center">
                <ApperIcon name="Users" size={16} className="mr-1" />
                Popular category
              </span>
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          icon="ArrowLeft"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </motion.div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckCircle" size={24} className="text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {tools.filter(t => t.implemented).length}
              </div>
              <div className="text-sm text-gray-600">Tools Ready</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ApperIcon name="TrendingUp" size={24} className="text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {tools.reduce((sum, tool) => sum + tool.usageCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Uses</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ApperIcon name="Star" size={24} className="text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {tools.filter(t => t.featured).length}
              </div>
              <div className="text-sm text-gray-600">Featured Tools</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Tools</h2>
            <div className="text-sm text-gray-500">
              {tools.length} tools in this category
            </div>
          </div>
          <ToolGrid tools={tools} />
        </div>
      ) : (
        <Empty
          icon="Package"
          title="No tools available"
          message="This category doesn't have any tools yet. Check back soon for updates!"
          actionText="Browse Other Categories"
          onAction={() => navigate('/')}
        />
      )}
    </div>
  )
}

export default CategoryView