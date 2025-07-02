import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import AboutUs from '@/components/pages/AboutUs'
import PrivacyPolicy from '@/components/pages/PrivacyPolicy'
import Disclaimer from '@/components/pages/Disclaimer'
import TermsConditions from '@/components/pages/TermsConditions'
import ContactUs from '@/components/pages/ContactUs'
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/contact" element={<ContactUs />} />
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