import React from 'react'
import { motion } from 'framer-motion'
import CategoryCard from '@/components/molecules/CategoryCard'

const CategoryGrid = ({ categories, className = "" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {categories.map((category) => (
        <motion.div key={category.Id} variants={itemVariants}>
          <CategoryCard category={category} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default CategoryGrid