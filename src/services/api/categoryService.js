import categoriesData from '@/services/mockData/categories.json'

// Add realistic delay to simulate API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(300)
    return [...categoriesData]
  },

  async getById(id) {
    await delay(200)
    const category = categoriesData.find(cat => cat.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  }
}