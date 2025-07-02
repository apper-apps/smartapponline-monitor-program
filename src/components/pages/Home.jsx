import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import ToolGrid from '@/components/organisms/ToolGrid'
import CategoryGrid from '@/components/organisms/CategoryGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { toolService } from '@/services/api/toolService'
import { categoryService } from '@/services/api/categoryService'

const Home = () => {
  const [featuredTools, setFeaturedTools] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [toolsData, categoriesData] = await Promise.all([
        toolService.getFeatured(),
        categoryService.getAll()
      ])
      setFeaturedTools(toolsData)
      setCategories(categoriesData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading) return <Loading type="categories" />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl">
              <ApperIcon name="Zap" size={40} className="text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-6">
            SmartAppOnline
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your all-in-one digital toolkit. Access 69 essential tools instantly without any downloads or installations. From PDF conversion to financial calculators - everything you need in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="xl" icon="Search">
              Explore All Tools
            </Button>
            <Button size="xl" variant="outline" icon="Star">
              Popular Tools
            </Button>
          </div>
          
          <div className="max-w-lg mx-auto">
            <SearchBar placeholder="Search from 69+ tools..." />
</div>
        </motion.div>
      </section>

      {/* AdSense Banner Ad */}
      <section className="flex justify-center">
        <div className="w-full max-w-4xl">
          <ins className="adsbygoogle block"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
               data-ad-slot="1234567890"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: 'Zap', number: '69+', label: 'Tools Available' },
          { icon: 'Users', number: '50K+', label: 'Happy Users' },
          { icon: 'Download', number: '1M+', label: 'Files Processed' },
          { icon: 'Clock', number: '24/7', label: 'Always Available' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 text-center card-shadow hover:card-shadow-hover transition-all duration-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ApperIcon name={stat.icon} size={24} className="text-primary" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">{stat.number}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Featured Tools */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Tools</h2>
            <p className="text-gray-600">Most used tools by our community</p>
          </div>
          <Button
            variant="outline"
            icon="ArrowRight"
            onClick={() => navigate('/search')}
          >
            View All
          </Button>
        </div>
        
        <ToolGrid tools={featuredTools} />
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tool Categories</h2>
            <p className="text-gray-600">Organized collections of specialized tools</p>
          </div>
        </div>
        
        <CategoryGrid categories={categories} />
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ApperIcon name="Sparkles" size={48} className="mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust SmartAppOnline for their daily digital tasks. 
            No signup required - start using tools immediately!
          </p>
          <Button
            size="xl"
            variant="secondary"
            icon="ArrowRight"
            onClick={() => navigate('/search')}
          >
            Start Using Tools Now
          </Button>
</motion.div>
      </section>

      {/* AdSense Rectangle Ad */}
      <section className="flex justify-center py-8">
        <div className="w-full max-w-md">
          <ins className="adsbygoogle block"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
               data-ad-slot="0987654321"
               data-ad-format="rectangle"
               data-full-width-responsive="true"></ins>
        </div>
      </section>
    </div>
  )
}

export default Home