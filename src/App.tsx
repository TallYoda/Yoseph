import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/gallery" element={<ExhibitionsPage />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </BrowserRouter>
  )
}
