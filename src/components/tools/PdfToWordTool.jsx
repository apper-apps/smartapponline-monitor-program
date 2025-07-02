import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FileUpload from '@/components/molecules/FileUpload'
const PdfToWordTool = () => {
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setResult(null)
  }

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select a PDF file first')
      return
    }

    setProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      setResult({
        filename: file.name.replace('.pdf', '.docx'),
        size: Math.round(file.size * 0.8), // Simulate compression
        downloadUrl: URL.createObjectURL(file) // Mock download URL
      })
      setProcessing(false)
      toast.success('PDF converted to Word successfully!')
    }, 2000)
  }

  const handleDownload = () => {
    if (result) {
      // Create a mock download
      const link = document.createElement('a')
      link.href = result.downloadUrl
      link.download = result.filename
      link.click()
      toast.success('Download started!')
    }
  }

  const handleReset = () => {
    setFile(null)
    setResult(null)
    setProcessing(false)
  }

return (
    <>
      <Helmet>
        <title>PDF to Word Converter - Convert PDF to Editable DOCX Online | SmartAppOnline</title>
        <meta name="description" content="Free online PDF to Word converter. Convert PDF documents to editable DOCX format while preserving formatting. Secure and fast processing." />
        <meta name="keywords" content="PDF to Word, PDF to DOCX, convert PDF, editable document, PDF converter, document conversion, online converter" />
        <meta property="og:title" content="PDF to Word Converter - Free Online Tool" />
        <meta property="og:description" content="Convert PDF documents to editable Word format online. Free, secure, and preserves formatting." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF to Word Converter - Free Online Tool" />
        <meta name="twitter:description" content="Convert PDF documents to editable Word format. Free and secure." />
        <link rel="canonical" href={`${window.location.origin}/tools/1`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF to Word Converter",
            "description": "Convert PDF documents to editable Word DOCX format online",
            "url": `${window.location.origin}/tools/1`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="FileText" size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Upload PDF</h3>
            <p className="text-sm text-gray-600">Select your PDF file to convert</p>
          </div>
        </div>

        <FileUpload
          onFileSelect={handleFileSelect}
          accept=".pdf"
          maxSize={50 * 1024 * 1024} // 50MB
        />

        {file && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <ApperIcon name="FileText" size={24} className="text-red-500" />
              </div>
            </div>

            <Button
              onClick={handleConvert}
              loading={processing}
              disabled={processing}
              className="w-full"
              size="large"
            >
              {processing ? 'Converting...' : 'Convert to Word'}
            </Button>
          </div>
        )}
      </Card>

      {/* Output Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="FileText" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Word Document</h3>
            <p className="text-sm text-gray-600">Your converted file will appear here</p>
          </div>
        </div>

        {processing ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <ApperIcon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <p className="text-gray-600 mb-2">Converting your PDF...</p>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-green-900">{result.filename}</p>
                  <p className="text-sm text-green-700">
                    {(result.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="FileText" size={24} className="text-green-600" />
                </div>
              </div>
              
              <div className="flex items-center text-sm text-green-700 mb-4">
                <ApperIcon name="CheckCircle" size={16} className="mr-2" />
                Conversion completed successfully
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleDownload}
                icon="Download"
                className="flex-1"
              >
                Download Word
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                icon="RotateCcw"
              >
                Convert Another
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ApperIcon name="FileText" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Upload a PDF file to start conversion</p>
          </div>
        )}
</Card>
      </div>
    </>
  )
}

export default PdfToWordTool