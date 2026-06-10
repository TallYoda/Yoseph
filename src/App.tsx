import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import WorksPage from './pages/WorksPage'
import AboutPage from './pages/AboutPage'
import CVPage from './pages/CVPage'
import ContactPage from './pages/ContactPage'
import ExhibitionsPage from './pages/ExhibitionsPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/gallery" element={<ExhibitionsPage />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </BrowserRouter>
  )
}
