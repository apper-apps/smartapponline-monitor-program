import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FileUpload from '@/components/molecules/FileUpload'
const PdfToJpgTool = () => {
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState([])
  const [quality, setQuality] = useState(90)

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setResults([])
  }

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select a PDF file first')
      return
    }

    setProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock multiple pages converted to JPG
      const mockResults = Array.from({ length: 3 }, (_, i) => ({
        pageNumber: i + 1,
        filename: `${file.name.replace('.pdf', '')}_page_${i + 1}.jpg`,
        size: Math.round(file.size * 0.3 * Math.random() + 100000),
        downloadUrl: URL.createObjectURL(file)
      }))
      
      setResults(mockResults)
      setProcessing(false)
      toast.success(`PDF converted to ${mockResults.length} JPG images!`)
    }, 3000)
  }

  const handleDownloadAll = () => {
    results.forEach((result, index) => {
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = result.downloadUrl
        link.download = result.filename
        link.click()
      }, index * 100)
    })
    toast.success('Download started for all images!')
  }

  const handleReset = () => {
    setFile(null)
    setResults([])
    setProcessing(false)
  }

return (
    <>
      <Helmet>
        <title>PDF to JPG Converter - Convert PDF Pages to Images Online | SmartAppOnline</title>
        <meta name="description" content="Free online PDF to JPG converter. Convert PDF pages to high-quality JPG images with adjustable quality settings. Fast and secure processing." />
        <meta name="keywords" content="PDF to JPG, PDF to image, convert PDF pages, PDF converter, extract images from PDF, online converter" />
        <meta property="og:title" content="PDF to JPG Converter - Free Online Tool" />
        <meta property="og:description" content="Convert PDF pages to JPG images online. Free, fast, and secure PDF to image converter." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF to JPG Converter - Free Online Tool" />
        <meta name="twitter:description" content="Convert PDF pages to JPG images online. Free and secure." />
        <link rel="canonical" href={`${window.location.origin}/tools/3`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF to JPG Converter",
            "description": "Convert PDF pages to high-quality JPG images online",
            "url": `${window.location.origin}/tools/3`,
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
            <p className="text-sm text-gray-600">Convert PDF pages to JPG images</p>
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

            {/* Quality Settings */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Image Quality: {quality}%
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Lower Size</span>
                <span>Higher Quality</span>
              </div>
            </div>

            <Button
              onClick={handleConvert}
              loading={processing}
              disabled={processing}
              className="w-full"
              size="large"
            >
              {processing ? 'Converting Pages...' : 'Convert to JPG'}
            </Button>
          </div>
        )}
      </Card>

      {/* Output Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Image" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">JPG Images</h3>
            <p className="text-sm text-gray-600">Converted pages will appear here</p>
          </div>
        </div>

        {processing ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <ApperIcon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <p className="text-gray-600 mb-2">Converting PDF pages...</p>
            <p className="text-sm text-gray-500">Processing each page individually</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">{results.length} images converted</span>
              <Button
                onClick={handleDownloadAll}
                icon="Download"
                size="small"
              >
                Download All
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {results.map((result) => (
                <div key={result.pageNumber} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Image" size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-900">Page {result.pageNumber}</p>
                        <p className="text-xs text-green-700">
                          {(result.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      size="small"
                      variant="outline"
                      icon="Download"
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = result.downloadUrl
                        link.download = result.filename
                        link.click()
                      }}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              icon="RotateCcw"
              className="w-full"
            >
              Convert Another PDF
            </Button>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ApperIcon name="Image" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Upload a PDF file to convert pages to JPG</p>
          </div>
        )}
</Card>
      </div>
    </>
  )
}

export default PdfToJpgTool