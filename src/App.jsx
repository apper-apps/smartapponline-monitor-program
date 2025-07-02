import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "@/index.css";
import Layout from "@/components/organisms/Layout";
import ContactUs from "@/components/pages/ContactUs";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";
import Disclaimer from "@/components/pages/Disclaimer";
import Home from "@/components/pages/Home";
import ToolInterface from "@/components/pages/ToolInterface";
import AboutUs from "@/components/pages/AboutUs";
import TermsConditions from "@/components/pages/TermsConditions";
import CategoryView from "@/components/pages/CategoryView";
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
          </Routes>
        </Layout>
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
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;