import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  shadow = 'card-shadow',
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        bg-white rounded-xl ${shadow} ${padding}
        ${hover ? 'hover:card-shadow-hover cursor-pointer' : ''}
        transition-all duration-200 ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card