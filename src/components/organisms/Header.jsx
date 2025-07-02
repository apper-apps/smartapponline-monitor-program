import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'

const Header = ({ onMenuToggle }) => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="Menu" size={24} />
            </button>
            
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center"
              >
                <ApperIcon name="Zap" size={24} className="text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text">SmartAppOnline</h1>
                <p className="text-xs text-gray-500 -mt-1">Your Digital Tool Suite</p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/search')}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="Search" size={20} />
            </button>
            
            <Button
              variant="outline"
              size="small"
              icon="Heart"
              className="hidden sm:inline-flex"
            >
              Favorites
            </Button>
            
            <Button
              variant="primary"
              size="small"
              icon="Star"
              className="hidden sm:inline-flex"
            >
              Upgrade
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

export default Header