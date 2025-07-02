import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  icon = "Search", 
  title = "No results found", 
  message = "Try adjusting your search or browse our categories.", 
  actionText = "Browse Categories",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={64} className="text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 transform hover:scale-105"
        >
          <ApperIcon name="Grid3X3" size={20} className="mr-2" />
          {actionText}
        </button>
      )}
    </div>
  )
}

export default Empty