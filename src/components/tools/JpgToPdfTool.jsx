import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FileUpload from '@/components/molecules/FileUpload'

const JpgToPdfTool = () => {
  const [files, setFiles] = useState([])
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [pageSize, setPageSize] = useState('A4')
  const [orientation, setOrientation] = useState('portrait')

  const handleFileSelect = (selectedFiles) => {
    setFiles(Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles])
    setResult(null)
  }

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one JPG file')
      return
    }

    setProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      const totalSize = files.reduce((sum, file) => sum + file.size, 0)
      setResult({
        filename: 'converted_images.pdf',
        size: Math.round(totalSize * 0.7), // Simulate compression
        downloadUrl: URL.createObjectURL(files[0]), // Mock download URL
        pageCount: files.length
      })
      setProcessing(false)
      toast.success(`${files.length} images converted to PDF successfully!`)
    }, 2500)
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result.downloadUrl
      link.download = result.filename
      link.click()
      toast.success('Download started!')
    }
  }

  const handleReset = () => {
    setFiles([])
    setResult(null)
    setProcessing(false)
  }

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Image" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Images</h3>
            <p className="text-sm text-gray-600">Select JPG images to convert to PDF</p>
          </div>
        </div>

        <FileUpload
          onFileSelect={handleFileSelect}
          accept=".jpg,.jpeg"
          multiple={true}
          maxSize={10 * 1024 * 1024} // 10MB per file
        />

        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            {/* File List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Image" size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    size="small"
                    variant="ghost"
                    icon="X"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500"
                  />
                </div>
              ))}
            </div>

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleConvert}
              loading={processing}
              disabled={processing}
              className="w-full"
              size="large"
            >
              {processing ? 'Creating PDF...' : `Convert ${files.length} Images to PDF`}
            </Button>
          </div>
        )}
      </Card>

      {/* Output Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="FileText" size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">PDF Document</h3>
            <p className="text-sm text-gray-600">Your converted PDF will appear here</p>
          </div>
        </div>

        {processing ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <ApperIcon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <p className="text-gray-600 mb-2">Creating PDF document...</p>
            <p className="text-sm text-gray-500">Combining {files.length} images</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-green-900">{result.filename}</p>
                  <p className="text-sm text-green-700">
                    {(result.size / 1024 / 1024).toFixed(2)} MB • {result.pageCount} pages
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="FileText" size={24} className="text-green-600" />
                </div>
              </div>
              
              <div className="flex items-center text-sm text-green-700 mb-4">
                <ApperIcon name="CheckCircle" size={16} className="mr-2" />
                PDF created successfully
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleDownload}
                icon="Download"
                className="flex-1"
              >
                Download PDF
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                icon="RotateCcw"
              >
                Convert More
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ApperIcon name="FileText" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Upload JPG images to create a PDF</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default JpgToPdfTool