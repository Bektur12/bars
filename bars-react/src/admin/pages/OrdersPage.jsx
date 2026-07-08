import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
    // Обновляем заказы каждые 10 секунд
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (id, status) => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id)
      if (error) throw error
      fetchOrders()
    } catch (error) {
      alert('Ошибка: ' + error.message)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('ru-RU')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '🟡'
      case 'completed': return '✅'
      case 'cancelled': return '❌'
      default: return '⏳'
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div>Загрузка заказов...</div>
  }

  return (
    <div>
      <div className="table-header">
        <h1>Заказы</h1>
        <span style={{ color: '#999', fontSize: '13px' }}>Всего: {orders.length}</span>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state"><p>Заказов еще нет</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Контакт</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{formatDate(order.created_at)}</td>
                  <td>{order.total_price?.toLocaleString()} с</td>
                  <td>{getStatusColor(order.status)} {order.status}</td>
                  <td>{order.customer_phone}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => setSelectedOrder(order)}>👁️ Просмотр</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Заказ #{selectedOrder.id}</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>×</button>
            </div>

            <div className="form-group">
              <label><strong>Контакт клиента</strong></label>
              <p style={{ marginBottom: '8px', color: '#333' }}>{selectedOrder.customer_name}</p>
              <p style={{ marginBottom: '8px', color: '#333' }}>{selectedOrder.customer_phone}</p>
            </div>

            <div className="form-group">
              <label><strong>Дата заказа</strong></label>
              <p style={{ color: '#333' }}>{formatDate(selectedOrder.created_at)}</p>
            </div>

            <div className="form-group">
              <label><strong>Товары</strong></label>
              <pre style={{ background: '#f9f9f9', padding: '12px', borderRadius: '4px', fontSize: '12px', overflow: 'auto' }}>
                {JSON.stringify(selectedOrder.items, null, 2)}
              </pre>
            </div>

            <div className="form-group">
              <label><strong>Сумма</strong></label>
              <p style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>{selectedOrder.total_price?.toLocaleString()} с</p>
            </div>

            <div className="form-group">
              <label><strong>Статус</strong></label>
              <select
                value={selectedOrder.status || 'pending'}
                onChange={(e) => {
                  updateOrderStatus(selectedOrder.id, e.target.value)
                  setSelectedOrder({ ...selectedOrder, status: e.target.value })
                }}
              >
                <option value="pending">⏳ В ожидании</option>
                <option value="completed">✅ Завершено</option>
                <option value="cancelled">❌ Отменено</option>
              </select>
            </div>

            {selectedOrder.notes && (
              <div className="form-group">
                <label><strong>Заметки</strong></label>
                <p style={{ color: '#333' }}>{selectedOrder.notes}</p>
              </div>
            )}

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setSelectedOrder(null)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
