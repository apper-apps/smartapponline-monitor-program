import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const PasswordGeneratorTool = () => {
  const [password, setPassword] = useState('')
  const [options, setOptions] = useState({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    excludeSimilar: true
  })
  const [strength, setStrength] = useState({ score: 0, label: 'Weak', color: 'red' })

  const generatePassword = () => {
    let charset = ''
    let similar = 'il1Lo0O'
    
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.numbers) charset += '0123456789'
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !similar.includes(char)).join('')
    }
    
    if (charset === '') {
      toast.error('Please select at least one character type')
      return
    }
    
    let result = ''
    for (let i = 0; i < options.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(result)
    calculateStrength(result)
  }

  const calculateStrength = (pwd) => {
    let score = 0
    
    // Length bonus
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    if (pwd.length >= 16) score += 1
    
    // Character variety
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1
    
    let label, color
    if (score < 3) {
      label = 'Weak'
      color = 'red'
    } else if (score < 5) {
      label = 'Medium'
      color = 'yellow'
    } else if (score < 6) {
      label = 'Strong'
      color = 'green'
    } else {
      label = 'Very Strong'
      color = 'emerald'
    }
    
    setStrength({ score, label, color })
  }

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      toast.success('Password copied to clipboard!')
    }
  }

  const handleOptionChange = (option, value) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }))
  }

  useEffect(() => {
    generatePassword()
  }, [options])

  const strengthColors = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    emerald: 'bg-emerald-500'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Settings */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Settings" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Password Options</h3>
            <p className="text-sm text-gray-600">Customize your password settings</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length: {options.length}
            </label>
            <input
              type="range"
              min="4"
              max="50"
              value={options.length}
              onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>50</span>
            </div>
          </div>

          {/* Character Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Include Characters</h4>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={(e) => handleOptionChange('uppercase', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-gray-700">Uppercase Letters (A-Z)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) => handleOptionChange('lowercase', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-gray-700">Lowercase Letters (a-z)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={(e) => handleOptionChange('numbers', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-gray-700">Numbers (0-9)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={(e) => handleOptionChange('symbols', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-gray-700">Symbols (!@#$%^&*)</span>
            </label>
          </div>

          {/* Advanced Options */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Advanced Options</h4>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.excludeSimilar}
                onChange={(e) => handleOptionChange('excludeSimilar', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-gray-700">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Generated Password */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Key" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Generated Password</h3>
            <p className="text-sm text-gray-600">Your secure password is ready</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Password Display */}
          <div className="relative">
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 min-h-[60px] flex items-center">
              <code className="text-lg font-mono text-gray-900 break-all flex-1">
                {password || 'Click generate to create password'}
              </code>
            </div>
            
            {password && (
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy to clipboard"
              >
                <ApperIcon name="Copy" size={20} />
              </button>
            )}
          </div>

          {/* Strength Indicator */}
          {password && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Password Strength</span>
                <span className={`text-sm font-semibold text-${strength.color}-600`}>
                  {strength.label}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${strengthColors[strength.color]}`}
                  style={{ width: `${(strength.score / 7) * 100}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-gray-500">
                Score: {strength.score}/7
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={generatePassword}
              icon="RefreshCw"
              className="flex-1"
            >
              Generate New
            </Button>
            
            <Button
              onClick={copyToClipboard}
              variant="outline"
              icon="Copy"
              disabled={!password}
            >
              Copy
            </Button>
          </div>

          {/* Security Tips */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
              <ApperIcon name="Shield" size={16} className="mr-2" />
              Security Tips
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Use a unique password for each account</li>
              <li>• Store passwords in a secure password manager</li>
              <li>• Enable two-factor authentication when available</li>
              <li>• Never share your passwords with others</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PasswordGeneratorTool