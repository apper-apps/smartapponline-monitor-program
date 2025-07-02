import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: 'Database',
      content: [
        'Personal information you provide when using our services',
        'Usage data and analytics to improve our tools',
        'Device and browser information for optimization',
        'Cookies and similar technologies for functionality'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: 'Settings',
      content: [
        'To provide and maintain our services',
        'To improve and optimize user experience',
        'To communicate important updates and notifications',
        'To analyze usage patterns and enhance our tools'
      ]
    },
    {
      title: 'Data Protection',
      icon: 'Shield',
      content: [
        'Industry-standard encryption for data transmission',
        'Secure servers with regular security audits',
        'Access controls and authentication measures',
        'Regular data backups and disaster recovery plans'
      ]
    },
    {
      title: 'Your Rights',
      icon: 'UserCheck',
      content: [
        'Access and review your personal data',
        'Request correction of inaccurate information',
        'Delete your account and associated data',
        'Opt-out of non-essential communications'
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Shield" size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="p-6">
          <p className="text-gray-700 leading-relaxed">
            At SmartAppOnline, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our digital tools and services. 
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
            please do not access our services.
          </p>
        </Card>
      </motion.div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-4">
                  <ApperIcon name={section.icon} size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <ApperIcon name="ChevronRight" size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8"
      >
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Mail" size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Questions About Privacy?</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please don't hesitate to contact us.
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="Mail" size={16} className="mr-1" />
                privacy@smartapponline.com
              </div>
              <div className="flex items-center">
                <ApperIcon name="Phone" size={16} className="mr-1" />
                +1 (555) 123-4567
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default PrivacyPolicy