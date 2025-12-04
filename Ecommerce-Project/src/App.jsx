import { HomePage } from './pages/HomePage'
import { Routes, Route } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
