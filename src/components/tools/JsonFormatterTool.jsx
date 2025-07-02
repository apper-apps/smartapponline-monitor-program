import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
const JsonFormatterTool = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indentSize, setIndentSize] = useState(2)

  const formatJson = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON data to format')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
      setError('')
      toast.success('JSON formatted successfully!')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setOutput('')
      toast.error('Invalid JSON format')
    }
  }

  const minifyJson = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON data to minify')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
      toast.success('JSON minified successfully!')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setOutput('')
      toast.error('Invalid JSON format')
    }
  }

  const validateJson = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON data to validate')
      return
    }

    try {
      JSON.parse(input)
      setError('')
      toast.success('JSON is valid!')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      toast.error('JSON is invalid')
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadSample = () => {
    const sampleJson = {
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00Z"
    }
    setInput(JSON.stringify(sampleJson))
  }

  const getJsonStats = () => {
    if (!output) return null

    try {
      const parsed = JSON.parse(output)
      const lines = output.split('\n').length
      const size = new Blob([output]).size
      
      const countObjects = (obj) => {
        if (typeof obj !== 'object' || obj === null) return 0
        let count = 1
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            count += countObjects(obj[key])
          }
        }
        return count
      }

      const countArrays = (obj) => {
        if (typeof obj !== 'object' || obj === null) return 0
        let count = Array.isArray(obj) ? 1 : 0
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            count += countArrays(obj[key])
          }
        }
        return count
      }

      return {
        lines,
        size,
        objects: countObjects(parsed),
        arrays: countArrays(parsed),
        keys: Object.keys(parsed).length
      }
    } catch {
      return null
    }
  }

  const stats = getJsonStats()

return (
    <>
      <Helmet>
        <title>JSON Formatter & Validator - Format, Validate, Minify JSON Online | SmartAppOnline</title>
        <meta name="description" content="Free online JSON formatter and validator. Format, minify, and validate JSON data with syntax highlighting and error detection. Developer-friendly tool." />
        <meta name="keywords" content="JSON formatter, JSON validator, JSON minifier, format JSON, validate JSON, JSON tool, developer tools" />
        <meta property="og:title" content="JSON Formatter & Validator - Free Online Tool" />
        <meta property="og:description" content="Format, validate, and minify JSON data online. Free developer tool with syntax highlighting." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="JSON Formatter & Validator - Free Online Tool" />
        <meta name="twitter:description" content="Format, validate, and minify JSON data online. Free developer tool." />
        <link rel="canonical" href={`${window.location.origin}/tools/15`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JSON Formatter",
            "description": "Format, validate, and minify JSON data online",
            "url": `${window.location.origin}/tools/15`,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "JSON formatting",
              "JSON validation", 
              "JSON minification",
              "Syntax error detection",
              "Statistics and analysis"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Braces" size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">JSON Input</h3>
              <p className="text-sm text-gray-600">Paste your JSON data here</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="small"
              icon="FileText"
              onClick={loadSample}
            >
              Sample
            </Button>
            <Button
              variant="outline"
              size="small"
              icon="Trash2"
              onClick={clearAll}
            >
              Clear
            </Button>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON data here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
        />

        {/* Controls */}
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Indent Size:
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(parseInt(e.target.value))}
              className="rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={formatJson}
              icon="Code"
              size="small"
            >
              Format
            </Button>
            <Button
              onClick={minifyJson}
              variant="outline"
              icon="Minimize2"
              size="small"
            >
              Minify
            </Button>
            <Button
              onClick={validateJson}
              variant="outline"
              icon="CheckCircle"
              size="small"
            >
              Validate
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <ApperIcon name="AlertCircle" size={16} className="text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">Validation Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Output Section */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Code" size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Formatted Output</h3>
              <p className="text-sm text-gray-600">Your formatted JSON will appear here</p>
            </div>
          </div>
          
          {output && (
            <Button
              variant="outline"
              size="small"
              icon="Copy"
              onClick={() => copyToClipboard(output)}
            >
              Copy
            </Button>
          )}
        </div>

        <div className="relative">
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          
          {output && (
            <button
              onClick={() => copyToClipboard(output)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              <ApperIcon name="Copy" size={16} />
            </button>
          )}
        </div>

        {/* Statistics */}
        {stats && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <ApperIcon name="BarChart3" size={16} className="mr-2" />
              JSON Statistics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Lines:</span>
                <span className="font-semibold text-blue-900">{stats.lines}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Size:</span>
                <span className="font-semibold text-blue-900">{stats.size} bytes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Objects:</span>
                <span className="font-semibold text-blue-900">{stats.objects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Arrays:</span>
                <span className="font-semibold text-blue-900">{stats.arrays}</span>
              </div>
            </div>
          </div>
        )}

        {/* JSON Tree Preview */}
        {!error && output && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <ApperIcon name="TreePine" size={16} className="mr-2" />
              Structure Preview
            </h4>
            <div className="text-xs text-gray-600 font-mono max-h-32 overflow-y-auto">
              {output.split('\n').slice(0, 10).map((line, index) => (
                <div key={index} className="whitespace-pre">
                  {line.length > 60 ? line.substring(0, 60) + '...' : line}
                </div>
              ))}
              {output.split('\n').length > 10 && (
                <div className="text-gray-400 italic">...and {output.split('\n').length - 10} more lines</div>
              )}
            </div>
          </div>
        )}
</Card>
      </div>
    </>
  )
}

export default JsonFormatterTool