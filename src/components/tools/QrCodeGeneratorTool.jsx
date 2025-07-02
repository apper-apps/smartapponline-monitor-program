import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
const QrCodeGeneratorTool = () => {
  const [qrData, setQrData] = useState('')
  const [qrType, setQrType] = useState('text')
  const [size, setSize] = useState(256)
  const [errorLevel, setErrorLevel] = useState('M')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const qrTypes = {
    text: { name: 'Plain Text', placeholder: 'Enter your text here...' },
    url: { name: 'Website URL', placeholder: 'https://example.com' },
    email: { name: 'Email', placeholder: 'mailto:example@email.com' },
    phone: { name: 'Phone Number', placeholder: 'tel:+1234567890' },
    sms: { name: 'SMS', placeholder: 'sms:+1234567890?body=Hello' },
    wifi: { name: 'WiFi', placeholder: 'WIFI:T:WPA;S:NetworkName;P:password;H:false;;' },
    vcard: { name: 'Contact Card', placeholder: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEND:VCARD' }
  }

  const generateQRCode = async () => {
    if (!qrData.trim()) {
      toast.error('Please enter data to generate QR code')
      return
    }

    setLoading(true)
    
    try {
      // Using QR Server API for demonstration
      const params = new URLSearchParams({
        data: qrData,
        size: `${size}x${size}`,
        ecc: errorLevel,
        bgcolor: backgroundColor.replace('#', ''),
        color: foregroundColor.replace('#', '')
      })
      
      const url = `https://api.qrserver.com/v1/create-qr-code/?${params}`
      setQrCodeUrl(url)
      toast.success('QR Code generated successfully!')
    } catch (error) {
      toast.error('Failed to generate QR code')
    } finally {
      setLoading(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qr-code-${Date.now()}.png`
    link.click()
    toast.success('QR Code downloaded!')
  }

  const copyQRCodeUrl = () => {
    if (!qrCodeUrl) return
    
    navigator.clipboard.writeText(qrCodeUrl)
    toast.success('QR Code URL copied to clipboard!')
  }

  const clearAll = () => {
    setQrData('')
    setQrCodeUrl('')
  }

  const loadSample = () => {
    const samples = {
      text: 'Hello, World! This is a sample QR code.',
      url: 'https://smartapponline.com',
      email: 'mailto:hello@smartapponline.com',
      phone: 'tel:+1234567890',
      sms: 'sms:+1234567890?body=Hello from SmartAppOnline!',
      wifi: 'WIFI:T:WPA;S:MyNetwork;P:mypassword;H:false;;',
      vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:SmartAppOnline\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD'
    }
    setQrData(samples[qrType])
  }

  useEffect(() => {
    if (qrData.trim()) {
      const debounceTimer = setTimeout(() => {
        generateQRCode()
      }, 500)
      return () => clearTimeout(debounceTimer)
    } else {
      setQrCodeUrl('')
    }
  }, [qrData, qrType, size, errorLevel, backgroundColor, foregroundColor])

return (
    <>
      <Helmet>
        <title>QR Code Generator - Create Custom QR Codes Online Free | SmartAppOnline</title>
        <meta name="description" content="Free QR code generator for text, URLs, WiFi, contacts, and more. Customize colors, size, and error correction. Download high-quality QR codes instantly." />
        <meta name="keywords" content="QR code generator, create QR code, custom QR code, QR code maker, free QR generator, barcode generator" />
        <meta property="og:title" content="QR Code Generator - Create Custom QR Codes Free" />
        <meta property="og:description" content="Generate custom QR codes for text, URLs, WiFi, and contacts. Free online tool with customization options." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="QR Code Generator - Create Custom QR Codes" />
        <meta name="twitter:description" content="Generate custom QR codes for various data types. Free online tool." />
        <link rel="canonical" href={`${window.location.origin}/tools/10`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "QR Code Generator",
            "description": "Generate custom QR codes for text, URLs, WiFi, contacts, and more",
            "url": `${window.location.origin}/tools/10`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Multiple QR code types",
              "Color customization",
              "Size adjustment",
              "Error correction levels",
              "High-quality downloads"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="QrCode" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">QR Code Settings</h3>
            <p className="text-sm text-gray-600">Configure your QR code data and appearance</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* QR Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Type
            </label>
            <select
              value={qrType}
              onChange={(e) => setQrType(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {Object.entries(qrTypes).map(([key, type]) => (
                <option key={key} value={key}>{type.name}</option>
              ))}
            </select>
          </div>

          {/* Data Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Data to Encode
              </label>
              <Button
                onClick={loadSample}
                variant="outline"
                size="small"
                icon="Lightbulb"
              >
                Sample
              </Button>
            </div>
            <textarea
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              placeholder={qrTypes[qrType].placeholder}
              rows={4}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {qrData.length} characters
            </p>
          </div>

          {/* Appearance Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size: {size}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>128px</span>
                <span>512px</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Error Correction
              </label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>

          {/* Color Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foreground Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={generateQRCode}
              loading={loading}
              disabled={!qrData.trim() || loading}
              icon="QrCode"
              className="flex-1"
            >
              Generate QR Code
            </Button>
            
            <Button
              onClick={clearAll}
              variant="outline"
              icon="Trash2"
            >
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Output Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Download" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Generated QR Code</h3>
            <p className="text-sm text-gray-600">Your QR code will appear here</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <ApperIcon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <p className="text-gray-600">Generating QR code...</p>
          </div>
        ) : qrCodeUrl ? (
          <div className="space-y-6">
            {/* QR Code Display */}
            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className="max-w-full h-auto"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </div>

            {/* QR Code Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Size</div>
                <div className="font-semibold text-gray-900">{size} × {size}px</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Error Level</div>
                <div className="font-semibold text-gray-900">{errorLevel}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Type</div>
                <div className="font-semibold text-gray-900">{qrTypes[qrType].name}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Data Length</div>
                <div className="font-semibold text-gray-900">{qrData.length} chars</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={downloadQRCode}
                icon="Download"
                className="flex-1"
              >
                Download PNG
              </Button>
              
              <Button
                onClick={copyQRCodeUrl}
                variant="outline"
                icon="Copy"
              >
                Copy URL
              </Button>
            </div>

            {/* Usage Tips */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                <ApperIcon name="Info" size={16} className="mr-2" />
                Usage Tips
              </h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Test your QR code with multiple devices before printing</li>
                <li>• Higher error correction helps with damaged codes</li>
                <li>• Ensure good contrast between foreground and background</li>
                <li>• For print, use at least 300 DPI resolution</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ApperIcon name="QrCode" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Enter data above to generate your QR code</p>
          </div>
        )}
</Card>
      </div>
    </>
  )
}

export default QrCodeGeneratorTool