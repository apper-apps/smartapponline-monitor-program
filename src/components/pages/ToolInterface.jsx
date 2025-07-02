import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FileUpload from '@/components/molecules/FileUpload'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { toolService } from '@/services/api/toolService'
import PdfToWordTool from '@/components/tools/PdfToWordTool'
import PdfToJpgTool from '@/components/tools/PdfToJpgTool'
import JpgToPdfTool from '@/components/tools/JpgToPdfTool'
import ImageCompressorTool from '@/components/tools/ImageCompressorTool'
import PasswordGeneratorTool from '@/components/tools/PasswordGeneratorTool'
import WordCounterTool from '@/components/tools/WordCounterTool'
import JsonFormatterTool from '@/components/tools/JsonFormatterTool'
import AgeCalculatorTool from '@/components/tools/AgeCalculatorTool'
import UnitConverterTool from '@/components/tools/UnitConverterTool'
import QrCodeGeneratorTool from '@/components/tools/QrCodeGeneratorTool'

const ToolInterface = () => {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const [tool, setTool] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTool = async () => {
    try {
      setLoading(true)
      setError('')
      const toolData = await toolService.getById(toolId)
      setTool(toolData)
      
      // Increment usage count
      await toolService.incrementUsage(toolId)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTool()
  }, [toolId])

  const renderToolComponent = () => {
    if (!tool.implemented) {
      return (
        <Card className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Clock" size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Coming Soon</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            This tool is currently under development. We're working hard to bring it to you soon!
          </p>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back to Tools
          </Button>
        </Card>
      )
    }

    // Route to specific tool components based on tool ID
    switch (parseInt(toolId)) {
      case 1: return <PdfToWordTool />
      case 3: return <PdfToJpgTool />
      case 4: return <JpgToPdfTool />
      case 7: return <ImageCompressorTool />
      case 10: return <QrCodeGeneratorTool />
      case 11: return <PasswordGeneratorTool />
      case 12: return <WordCounterTool />
      case 15: return <JsonFormatterTool />
      case 17: return <AgeCalculatorTool />
      case 19: return <UnitConverterTool />
      default:
        return (
          <Card className="text-center py-12">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Construction" size={48} className="text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Under Development</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              This tool interface is currently being built. Please check back soon!
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Tools
            </Button>
          </Card>
        )
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTool} />
  if (!tool) return <Error message="Tool not found" />

return (
    <>
      <Helmet>
        <title>{tool ? `${tool.name} - ${tool.description} | SmartAppOnline` : 'Tool Interface | SmartAppOnline'}</title>
        <meta name="description" content={tool ? `${tool.description}. Free online tool with ${tool.usageCount.toLocaleString()} uses.` : 'Access powerful online tools for document conversion, image processing, and more.'} />
        <meta name="keywords" content={tool ? `${tool.name.toLowerCase()}, ${tool.description.toLowerCase()}, online tool, free tool` : 'online tools, free tools, web applications'} />
        <meta property="og:title" content={tool ? `${tool.name} - Free Online Tool` : 'Tool Interface'} />
        <meta property="og:description" content={tool ? tool.description : 'Access powerful online tools'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={tool ? `${tool.name} - Free Online Tool` : 'Tool Interface'} />
        <meta name="twitter:description" content={tool ? tool.description : 'Access powerful online tools'} />
        <link rel="canonical" href={`${window.location.origin}/tools/${toolId}`} />
        {tool && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": tool.name,
              "description": tool.description,
              "url": `${window.location.origin}/tools/${toolId}`,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": tool.usageCount,
                "bestRating": "5",
                "worstRating": "1"
              }
            })}
          </script>
        )}
      </Helmet>
      
      <div className="space-y-8">
        {/* Tool Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center"
          >
            <ApperIcon name={tool.icon} size={32} className="text-primary" />
          </motion.div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {tool.name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {tool.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <ApperIcon name="Users" size={16} className="mr-1" />
                {tool.usageCount.toLocaleString()} uses
              </span>
              <span className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${tool.implemented ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                {tool.implemented ? 'Ready to use' : 'Coming soon'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            icon="Heart"
            size="small"
          >
            Save
          </Button>
          <Button
            variant="outline"
            icon="Share2"
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              toast.success('Link copied to clipboard!')
            }}
          >
            Share
          </Button>
          <Button
            variant="ghost"
            icon="ArrowLeft"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </motion.div>

      {/* Tool Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {renderToolComponent()}
</motion.div>
      </div>
    </>
  )
}

export default ToolInterface