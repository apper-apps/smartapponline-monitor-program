import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const Disclaimer = () => {
  const disclaimerSections = [
    {
      title: 'General Information',
      icon: 'Info',
      content: 'The information provided on SmartAppOnline is for general informational purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of our services.'
    },
    {
      title: 'Tool Accuracy',
      icon: 'AlertTriangle',
      content: 'Our digital tools are designed to provide accurate results based on the input provided. However, we cannot guarantee 100% accuracy in all scenarios. Users should verify critical calculations and results independently when necessary for important decisions.'
    },
    {
      title: 'Data Processing',
      icon: 'Database',
      content: 'While we implement security measures to protect your data during processing, users are responsible for ensuring their data is backed up before using our tools. We are not liable for any data loss that may occur during the use of our services.'
    },
    {
      title: 'External Links',
      icon: 'ExternalLink',
      content: 'Our website may contain links to external sites. We have no control over the content and nature of these sites and are not responsible for their content, privacy policies, or practices.'
    },
    {
      title: 'Service Availability',
      icon: 'Wifi',
      content: 'We strive to maintain high uptime for our services, but we cannot guarantee uninterrupted availability. Maintenance, updates, or technical issues may temporarily affect service availability.'
    },
    {
      title: 'Limitation of Liability',
      icon: 'Shield',
      content: 'In no event shall SmartAppOnline be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of our services, even if we have been advised of the possibility of such damages.'
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
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-4">Disclaimer</h1>
        <p className="text-lg text-gray-600">
          Important information about the use of our services
        </p>
      </motion.div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-orange-400">
          <div className="flex items-start">
            <ApperIcon name="AlertCircle" size={24} className="text-orange-500 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Important Notice</h3>
              <p className="text-gray-700">
                Please read this disclaimer carefully before using any of our digital tools and services. 
                By accessing and using SmartAppOnline, you acknowledge that you have read, understood, 
                and agree to be bound by the terms of this disclaimer.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Disclaimer Sections */}
      <div className="space-y-6">
        {disclaimerSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
          >
            <Card className="p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-4 mt-1">
                  <ApperIcon name={section.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Usage Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8"
      >
        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="CheckCircle" size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                <ApperIcon name="Bookmark" size={16} className="text-primary mr-2" />
                Always backup important data
              </div>
              <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                <ApperIcon name="Eye" size={16} className="text-primary mr-2" />
                Review results carefully
              </div>
              <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                <ApperIcon name="HelpCircle" size={16} className="text-primary mr-2" />
                Contact support when needed
              </div>
              <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                <ApperIcon name="RefreshCw" size={16} className="text-primary mr-2" />
                Keep browsers updated
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Last Updated */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-500">
          This disclaimer was last updated on {new Date().toLocaleDateString()}
        </p>
      </motion.div>
    </div>
  )
}

export default Disclaimer