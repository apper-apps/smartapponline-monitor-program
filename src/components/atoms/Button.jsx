import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 focus:ring-primary/50 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500/50 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500/50',
    success: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 focus:ring-emerald-500/50',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:ring-red-500/50'
  }
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2.5 text-sm',
    large: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  
  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'} ${className}`
  
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={buttonClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} size={16} className="mr-2" />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} size={16} className="ml-2" />
      )}
    </motion.button>
  )
}

export default Button