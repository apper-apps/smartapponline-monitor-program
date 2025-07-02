import toolsData from '@/services/mockData/tools.json'

// Add realistic delay to simulate API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const toolService = {
  async getAll() {
    await delay(400)
    return [...toolsData]
  },

  async getById(id) {
    await delay(200)
    const tool = toolsData.find(tool => tool.Id === parseInt(id))
    if (!tool) {
      throw new Error('Tool not found')
    }
    return { ...tool }
  },

  async getByCategory(categoryId) {
    await delay(300)
    return toolsData.filter(tool => tool.categoryId === parseInt(categoryId))
  },

  async getFeatured() {
    await delay(250)
    return toolsData.filter(tool => tool.featured)
  },

  async search(query) {
    await delay(300)
    const lowercaseQuery = query.toLowerCase()
    return toolsData.filter(tool => 
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery)
    )
  },

  async incrementUsage(id) {
    await delay(100)
    const toolIndex = toolsData.findIndex(tool => tool.Id === parseInt(id))
    if (toolIndex !== -1) {
      toolsData[toolIndex].usageCount += 1
      return { ...toolsData[toolIndex] }
    }
    throw new Error('Tool not found')
  }
}