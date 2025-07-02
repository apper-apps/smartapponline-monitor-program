import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FileUpload = ({ 
  onFileSelect, 
  accept = "*/*", 
  multiple = false, 
  maxSize = 10 * 1024 * 1024, // 10MB default
  className = ""
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
    }
    return null
  }

  const handleFiles = useCallback((fileList) => {
    const newFiles = Array.from(fileList)
    const validFiles = []
    let errorMessage = ''

    newFiles.forEach(file => {
      const error = validateFile(file)
      if (error) {
        errorMessage = error
      } else {
        validFiles.push(file)
      }
    })

    if (errorMessage) {
      setError(errorMessage)
      return
    }

    setError('')
    if (multiple) {
      setFiles(validFiles)
      onFileSelect?.(validFiles)
    } else if (validFiles.length > 0) {
      setFiles([validFiles[0]])
      onFileSelect?.(validFiles[0])
    }
  }, [multiple, maxSize, onFileSelect])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleFileInput = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFileSelect?.(multiple ? newFiles : null)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={className}>
      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${dragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <motion.div
          animate={{ y: dragActive ? -5 : 0 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 ${
            dragActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            <ApperIcon name={dragActive ? "Download" : "Upload"} size={32} />
          </div>
          
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-2">
              {dragActive ? 'Drop files here' : 'Upload your files'}
            </p>
            <p className="text-gray-500 text-sm">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Max size: {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center">
              <ApperIcon name="AlertCircle" size={20} className="text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name="File" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-48">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FileUpload