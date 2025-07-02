import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const CategoryCard = ({ category }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/category/${category.Id}`)
  }

  return (
    <Card onClick={handleClick} className="group">
      <div className="flex items-center space-x-4 mb-4">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-16 h-16 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <ApperIcon 
            name={category.icon} 
            size={32} 
            style={{ color: category.color }}
          />
        </motion.div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 group-hover:gradient-text transition-all duration-200">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            {category.toolCount} tools available
          </p>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {category.description}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 font-medium">
          Click to explore
        </span>
        
        <motion.div
          whileHover={{ x: 4 }}
          className="text-primary group-hover:text-secondary transition-colors duration-200"
        >
          <ApperIcon name="ArrowRight" size={20} />
        </motion.div>
      </div>
    </Card>
  )
}

export default CategoryCard