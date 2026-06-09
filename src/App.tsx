import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ExhibitionsPage from './pages/ExhibitionsPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/works"
            element={<Navigate to={{ pathname: '/', hash: '#works' }} replace />}
          />
          <Route
            path="/about"
            element={<Navigate to={{ pathname: '/', hash: '#about' }} replace />}
          />
          <Route
            path="/cv"
            element={<Navigate to={{ pathname: '/', hash: '#cv' }} replace />}
          />
          <Route
            path="/contact"
            element={<Navigate to={{ pathname: '/', hash: '#contact' }} replace />}
          />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/gallery" element={<ExhibitionsPage />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </BrowserRouter>
  )
}
