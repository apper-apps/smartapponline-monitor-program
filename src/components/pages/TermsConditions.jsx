import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const TermsConditions = () => {
  const termsSection = [
    {
      title: 'Acceptance of Terms',
      icon: 'FileCheck',
      content: 'By accessing and using SmartAppOnline, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: 'Use License',
      icon: 'Key',
      content: 'Permission is granted to temporarily use SmartAppOnline for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials, use the materials for any commercial purpose or for any public display, attempt to reverse engineer any software contained on our website, or remove any copyright or other proprietary notations from the materials.'
    },
    {
      title: 'User Responsibilities',
      icon: 'User',
      content: 'You are responsible for safeguarding any passwords or access credentials associated with your use of our services. You agree not to use our services for any unlawful purpose or in violation of any applicable laws or regulations. You must not attempt to gain unauthorized access to our systems or networks.'
    },
    {
      title: 'Content and Data',
      icon: 'Database',
      content: 'You retain ownership of any content or data you upload to our services. By using our tools, you grant us a license to process your data solely for the purpose of providing our services. We do not claim ownership of your content and will not use it for any purpose other than service provision.'
    },
    {
      title: 'Service Modifications',
      icon: 'Settings',
      content: 'SmartAppOnline reserves the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice. We may also modify these terms at any time, and such modifications will be effective immediately upon posting.'
    },
    {
      title: 'Privacy and Security',
      icon: 'Shield',
      content: 'We are committed to protecting your privacy and maintaining the security of your data. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference.'
    },
    {
      title: 'Intellectual Property',
      icon: 'Copyright',
      content: 'All content, features, and functionality of SmartAppOnline, including but not limited to text, graphics, logos, images, and software, are owned by us and are protected by copyright, trademark, and other intellectual property laws.'
    },
    {
      title: 'Limitation of Liability',
      icon: 'AlertTriangle',
      content: 'In no event shall SmartAppOnline or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services, even if we have been notified orally or in writing of the possibility of such damage.'
    },
    {
      title: 'Termination',
      icon: 'XCircle',
      content: 'We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.'
    },
    {
      title: 'Governing Law',
      icon: 'Scale',
      content: 'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which SmartAppOnline operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.'
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
          <ApperIcon name="FileText" size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-4">Terms & Conditions</h1>
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
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
          <div className="flex items-start">
            <ApperIcon name="Info" size={24} className="text-primary mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Welcome to SmartAppOnline</h3>
              <p className="text-gray-700">
                These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship 
                with SmartAppOnline operated by our company. Please read these Terms and Conditions 
                carefully before using our service.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Terms Sections */}
      <div className="space-y-6">
        {termsSection.map((section, index) => (
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

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-8"
      >
        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="MessageCircle" size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Questions About These Terms?</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms and Conditions, please contact us.
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="Mail" size={16} className="mr-2 text-primary" />
                legal@smartapponline.com
              </div>
              <div className="flex items-center">
                <ApperIcon name="Phone" size={16} className="mr-2 text-primary" />
                +1 (555) 123-4567
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Agreement Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="mt-6"
      >
        <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <p className="text-sm text-gray-700">
            By continuing to use SmartAppOnline, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default TermsConditions