import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import CategoryView from '@/components/pages/CategoryView'
import ToolInterface from '@/components/pages/ToolInterface'
import SearchResults from '@/components/pages/SearchResults'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="/tool/:toolId" element={<ToolInterface />} />
            <Route path="/search" element={<SearchResults />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  )
}

export default App