import { Analytics } from '@vercel/analytics/react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <div className="page">
      <Header />
      <HomePage />
      <Footer />
      <Analytics />
    </div>
  )
}
