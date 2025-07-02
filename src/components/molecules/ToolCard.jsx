import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'

const ToolCard = ({ tool }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/tool/${tool.Id}`)
  }

  const formatUsageCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <Card onClick={handleClick} className="group relative overflow-hidden">
      {tool.featured && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-accent to-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
          Popular
        </div>
      )}
      
      <div className="flex items-center space-x-4 mb-4">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center"
        >
          <ApperIcon name={tool.icon} size={24} className="text-primary" />
        </motion.div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:gradient-text transition-all duration-200">
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 font-medium">
            {formatUsageCount(tool.usageCount)} uses
          </p>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {tool.description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${tool.implemented ? 'bg-green-400' : 'bg-gray-300'}`}></div>
          <span className="text-xs text-gray-500">
            {tool.implemented ? 'Ready' : 'Coming Soon'}
          </span>
        </div>
        
        <Button 
          size="small" 
          variant={tool.implemented ? 'primary' : 'secondary'}
          disabled={!tool.implemented}
        >
          {tool.implemented ? 'Use Tool' : 'Coming Soon'}
        </Button>
      </div>
    </Card>
  )
}

export default ToolCard