import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ 
  label, 
  icon, 
  error, 
  helper, 
  className = '', 
  required = false,
  type = 'text',
  ...props 
}) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={20} className="text-gray-400" />
          </div>
        )}
        
        <input
          id={inputId}
          type={type}
          className={`
            block w-full rounded-lg border-gray-300 shadow-sm
            ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5
            focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-colors duration-200
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center mt-1">
          <ApperIcon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-gray-500 mt-1">{helper}</p>
      )}
    </div>
  )
}

export default Input