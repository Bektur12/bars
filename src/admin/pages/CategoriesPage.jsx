import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*')
      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase.from('categories').update(formData).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([formData])
        if (error) throw error
      }
      setShowModal(false)
      setEditingId(null)
      setFormData({ name: '', description: '' })
      fetchCategories()
    } catch (error) {
      alert('Ошибка: ' + error.message)
    }
  }

  const handleEdit = (category) => {
    setFormData(category)
    setEditingId(category.id)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Удалить категорию?')) return
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id)
      if (error) throw error
      fetchCategories()
    } catch (error) {
      alert('Ошибка: ' + error.message)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: '', description: '' })
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div>Загрузка категорий...</div>
  }

  return (
    <div>
      <div className="table-header">
        <h1>Категории</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Добавить категорию</button>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state"><p>Категорий еще нет. Нажми кнопку выше чтобы добавить.</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Описание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description || '-'}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => handleEdit(category)}>✏️ Редакт</button>
                    <button className="btn-danger" onClick={() => handleDelete(category.id)}>🗑️ Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Редактирование категории' : 'Новая категория'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Название *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Описание</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Отмена</button>
                <button type="submit" className="btn-primary">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
