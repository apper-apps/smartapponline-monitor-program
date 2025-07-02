import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const AboutUs = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Our tools are optimized for speed and efficiency, helping you get things done quickly.'
    },
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'Your data is processed securely with privacy as our top priority.'
    },
    {
      icon: 'Globe',
      title: 'Always Available',
      description: 'Access our tools anytime, anywhere with our web-based platform.'
    },
    {
      icon: 'Users',
      title: 'User-Friendly',
      description: 'Intuitive interfaces designed for users of all technical levels.'
    }
  ]

  const stats = [
    { number: '50+', label: 'Digital Tools' },
    { number: '100K+', label: 'Happy Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            About SmartAppOnline
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about creating powerful, accessible digital tools that help individuals and businesses streamline their workflows and boost productivity.
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Target" size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              To democratize access to professional-grade digital tools by providing a comprehensive, 
              user-friendly platform that empowers everyone to work smarter, not harder.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <Card className="p-8 bg-gradient-to-r from-primary to-secondary text-white">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          We're committed to continuous improvement, innovation, and providing exceptional user experiences. 
          Our team works tirelessly to ensure our tools meet the evolving needs of our users.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="CheckCircle" size={24} className="text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Quality Assured</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Headphones" size={24} className="text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">24/7 Support</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Sparkles" size={24} className="text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Regular Updates</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutUs