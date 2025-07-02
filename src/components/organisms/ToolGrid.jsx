import React from 'react'
import { motion } from 'framer-motion'
import ToolCard from '@/components/molecules/ToolCard'

const ToolGrid = ({ tools, className = "" }) => {
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
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {tools.map((tool) => (
        <motion.div key={tool.Id} variants={itemVariants}>
          <ToolCard tool={tool} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ToolGrid