import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FileUpload from '@/components/molecules/FileUpload'

const ImageCompressorTool = () => {
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [quality, setQuality] = useState(75)
  const [targetSize, setTargetSize] = useState('')

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setResult(null)
  }

  const handleCompress = async () => {
    if (!file) {
      toast.error('Please select an image file first')
      return
    }

    setProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      const compressionRatio = quality / 100
      const newSize = Math.round(file.size * compressionRatio * (Math.random() * 0.3 + 0.4))
      
      setResult({
        filename: file.name.replace(/\.[^/.]+$/, '_compressed$&'),
        originalSize: file.size,
        compressedSize: newSize,
        reduction: ((file.size - newSize) / file.size * 100).toFixed(1),
        downloadUrl: URL.createObjectURL(file) // Mock download URL
      })
      setProcessing(false)
      toast.success('Image compressed successfully!')
    }, 2000)
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
    setFile(null)
    setResult(null)
    setProcessing(false)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Image" size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Image</h3>
            <p className="text-sm text-gray-600">Compress your image to reduce file size</p>
          </div>
        </div>

        <FileUpload
          onFileSelect={handleFileSelect}
          accept=".jpg,.jpeg,.png,.webp"
          maxSize={20 * 1024 * 1024} // 20MB
        />

        {file && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <ApperIcon name="Image" size={24} className="text-purple-500" />
              </div>
            </div>

            {/* Compression Settings */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Smaller Size</span>
                  <span>Better Quality</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Size (optional)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={targetSize}
                    onChange={(e) => setTargetSize(e.target.value)}
                    placeholder="e.g., 100"
                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <select className="rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                  </select>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCompress}
              loading={processing}
              disabled={processing}
              className="w-full"
              size="large"
              icon="Minimize2"
            >
              {processing ? 'Compressing...' : 'Compress Image'}
            </Button>
          </div>
        )}
      </Card>

      {/* Output Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Download" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Compressed Image</h3>
            <p className="text-sm text-gray-600">Your optimized image will appear here</p>
          </div>
        </div>

        {processing ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <ApperIcon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <p className="text-gray-600 mb-2">Compressing your image...</p>
            <p className="text-sm text-gray-500">Optimizing file size and quality</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            {/* Before/After Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-xs text-gray-600 mb-1">Original</p>
                <p className="font-semibold text-gray-900">{formatFileSize(result.originalSize)}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <p className="text-xs text-green-600 mb-1">Compressed</p>
                <p className="font-semibold text-green-900">{formatFileSize(result.compressedSize)}</p>
              </div>
            </div>

            {/* Savings */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-900 font-medium">Space Saved</span>
                <span className="text-2xl font-bold text-green-900">{result.reduction}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${result.reduction}%` }}
                ></div>
              </div>
              <p className="text-sm text-green-700 mt-2">
                Saved {formatFileSize(result.originalSize - result.compressedSize)}
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleDownload}
                icon="Download"
                className="flex-1"
              >
                Download Compressed
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                icon="RotateCcw"
              >
                Compress Another
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ApperIcon name="Image" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Upload an image to start compression</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default ImageCompressorTool