import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact' }),
        supabase.from('categories').select('*', { count: 'exact' }),
      ])

      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Загрузка...
      </div>
    )
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: '#999', marginBottom: '30px' }}>Обзор основной статистики магазина</p>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.products}</div>
          <div className="stat-label">📦 Товаров</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.categories}</div>
          <div className="stat-label">🏷️ Категорий</div>
        </div>
      </div>

      <div className="table-container" style={{ marginTop: '40px' }}>
        <div className="table-header">
          <h2>Последние заказы</h2>
        </div>
        <div className="empty-state">
          <p>Откройте вкладку "Заказы" чтобы увидеть полный список</p>
        </div>
      </div>
    </div>
  )
}
