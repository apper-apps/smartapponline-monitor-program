import React, { useState, useMemo } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'

const WordCounterTool = () => {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim() !== '').length
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim() !== '').length
    const averageWordsPerSentence = sentences > 0 ? (words / sentences).toFixed(1) : 0
    const readingTime = Math.ceil(words / 200) // 200 words per minute average
    const speakingTime = Math.ceil(words / 130) // 130 words per minute average

    return {
      characters,
      charactersNoSpaces,
      words,
      paragraphs,
      sentences,
      averageWordsPerSentence,
      readingTime,
      speakingTime
    }
  }, [text])

  const handleClear = () => {
    setText('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    // You can add toast notification here
  }

  const getReadabilityScore = () => {
    if (stats.words === 0 || stats.sentences === 0) return { score: 0, level: 'N/A' }
    
    const avgWordsPerSentence = stats.words / stats.sentences
    const avgSyllablesPerWord = 1.5 // Simplified estimate
    
    // Flesch Reading Ease formula (simplified)
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
    
    let level
    if (score >= 90) level = 'Very Easy'
    else if (score >= 80) level = 'Easy'
    else if (score >= 70) level = 'Fairly Easy'
    else if (score >= 60) level = 'Standard'
    else if (score >= 50) level = 'Fairly Difficult'
    else if (score >= 30) level = 'Difficult'
    else level = 'Very Difficult'
    
    return { score: Math.max(0, Math.min(100, Math.round(score))), level }
  }

  const readability = getReadabilityScore()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Text Input */}
      <div className="lg:col-span-2">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Type" size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Text Input</h3>
                <p className="text-sm text-gray-600">Enter or paste your text to analyze</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="small"
                icon="Copy"
                onClick={handleCopy}
                disabled={!text}
              >
                Copy
              </Button>
              <Button
                variant="outline"
                size="small"
                icon="Trash2"
                onClick={handleClear}
                disabled={!text}
              >
                Clear
              </Button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
          />

          {/* Quick Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{stats.words} words</span>
            <span>{stats.characters} characters</span>
            <span>{stats.sentences} sentences</span>
            <span>{stats.paragraphs} paragraphs</span>
          </div>
        </Card>
      </div>

      {/* Statistics Panel */}
      <div className="space-y-6">
        {/* Basic Stats */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Hash" size={16} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Basic Statistics</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Words</span>
              <span className="font-semibold text-gray-900">{stats.words.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Characters</span>
              <span className="font-semibold text-gray-900">{stats.characters.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Characters (no spaces)</span>
              <span className="font-semibold text-gray-900">{stats.charactersNoSpaces.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sentences</span>
              <span className="font-semibold text-gray-900">{stats.sentences.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Paragraphs</span>
              <span className="font-semibold text-gray-900">{stats.paragraphs.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Reading Stats */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" size={16} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Reading Time</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reading time</span>
              <span className="font-semibold text-gray-900">
                {stats.readingTime} min{stats.readingTime !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Speaking time</span>
              <span className="font-semibold text-gray-900">
                {stats.speakingTime} min{stats.speakingTime !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg words/sentence</span>
              <span className="font-semibold text-gray-900">{stats.averageWordsPerSentence}</span>
            </div>
          </div>
        </Card>

        {/* Readability */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Target" size={16} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Readability</h3>
          </div>

          {stats.words > 0 ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reading level</span>
                <span className="font-semibold text-gray-900">{readability.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Flesch score</span>
                <span className="font-semibold text-gray-900">{readability.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${readability.score}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Enter text to see readability analysis</p>
          )}
        </Card>

        {/* Word Limits */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="AlertCircle" size={16} className="text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Common Limits</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tweet</span>
              <span className={`font-semibold ${stats.characters <= 280 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.characters}/280
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Facebook post</span>
              <span className={`font-semibold ${stats.characters <= 63206 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.characters}/63,206
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Instagram caption</span>
              <span className={`font-semibold ${stats.characters <= 2200 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.characters}/2,200
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default WordCounterTool