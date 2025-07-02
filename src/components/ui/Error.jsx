import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" size={48} className="text-red-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message || "We encountered an error while loading the content. Please try again."}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 transform hover:scale-105"
        >
          <ApperIcon name="RefreshCw" size={20} className="mr-2" />
          Try Again
        </button>
      )}
    </div>
  )
}

export default Error