import React from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold gradient-text">SmartAppOnline</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4 max-w-md">
              Your comprehensive digital tool suite. Streamline your workflow with our collection of powerful, easy-to-use online tools.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <ApperIcon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <ApperIcon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <ApperIcon name="Linkedin" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <ApperIcon name="Github" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                  Search Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} SmartAppOnline. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2 sm:mt-0">
              Made with <ApperIcon name="Heart" size={16} className="inline mx-1 text-red-500" /> for productivity
            </p>
          </div>
</div>

        {/* AdSense Footer Ad */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center">
            <ins className="adsbygoogle block"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
                 data-ad-slot="6677889900"
                 data-ad-format="horizontal"
                 data-full-width-responsive="true"></ins>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer