import { useState } from 'react'
import './admin.css'
import AdminNav from './components/AdminNav'
import ProductsPage from './pages/ProductsPage'
import CategoriesPage from './pages/CategoriesPage'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products')

  const renderPage = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsPage />
      case 'categories':
        return <CategoriesPage />
      default:
        return <ProductsPage />
    }
  }

  return (
    <div className="admin-container">
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="admin-content">
        {renderPage()}
      </div>
    </div>
  )
}
