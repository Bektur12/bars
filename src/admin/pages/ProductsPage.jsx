import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    in_stock: true,
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*')
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*')
      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Получаем публичный URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      setFormData({ ...formData, image_url: publicUrl })
    } catch (error) {
      alert('Ошибка загрузки: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async () => {
    if (!formData.image_url) return
    try {
      const fileName = formData.image_url.split('/').pop()
      await supabase.storage.from('product-images').remove([fileName])
      setFormData({ ...formData, image_url: '' })
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Подготовим данные: пустая строка category_id должна быть null
      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price),
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
      }

      if (editingId) {
        const { error } = await supabase
          .from('products')
          .update(dataToSubmit)
          .eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert([dataToSubmit])
        if (error) throw error
      }
      setShowModal(false)
      setEditingId(null)
      setFormData({ name: '', description: '', price: '', category_id: '', image_url: '', in_stock: true })
      fetchProducts()
    } catch (error) {
      alert('Ошибка: ' + error.message)
    }
  }

  const handleEdit = (product) => {
    setFormData(product)
    setEditingId(product.id)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Удалить товар?')) return
    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      fetchProducts()
    } catch (error) {
      alert('Ошибка: ' + error.message)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: '', description: '', price: '', category_id: '', image_url: '', in_stock: true })
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div>Загрузка товаров...</div>
  }

  return (
    <div>
      <div className="table-header">
        <h1>Товары</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Добавить товар</button>
      </div>

      {products.length === 0 ? (
        <div className="empty-state"><p>Товаров еще нет. Нажми кнопку выше чтобы добавить.</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Фото</th>
                <th>Название</th>
                <th>Цена</th>
                <th>Категория</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td style={{ width: '80px' }}>
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <span style={{ color: '#999' }}>-</span>
                    )}
                  </td>
                  <td style={{ minWidth: '200px', fontWeight: 600, color: '#333' }}>{product.name || '-'}</td>
                  <td style={{ minWidth: '100px', fontWeight: 600, color: '#c8362a' }}>
                    {product.price ? `${parseFloat(product.price).toLocaleString('ru-RU')} с` : '-'}
                  </td>
                  <td style={{ minWidth: '120px' }}>{categories.find(c => c.id === product.category_id)?.name || '-'}</td>
                  <td style={{ minWidth: '180px' }}>
                    <button className="btn-secondary" onClick={() => handleEdit(product)}>✏️ Редакт</button>
                    <button className="btn-danger" onClick={() => handleDelete(product.id)}>🗑️ Удалить</button>
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
              <h2>{editingId ? 'Редактирование товара' : 'Новый товар'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Image Upload */}
              <div className="form-group">
                <label>Фотография товара</label>
                <div style={{ marginBottom: '12px' }}>
                  {formData.image_url ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={formData.image_url}
                        alt="preview"
                        style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }}
                      />
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={handleDeleteImage}
                        style={{ marginTop: '8px', width: '100%' }}
                      >
                        🗑️ Удалить фото
                      </button>
                    </div>
                  ) : (
                    <label
                      style={{
                        display: 'block',
                        border: '2px dashed #ddd',
                        borderRadius: '4px',
                        padding: '40px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.currentTarget.style.borderColor = '#c8362a'
                        e.currentTarget.style.background = 'rgba(200, 54, 42, 0.05)'
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.style.borderColor = '#ddd'
                        e.currentTarget.style.background = 'transparent'
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.currentTarget.style.borderColor = '#ddd'
                        e.currentTarget.style.background = 'transparent'
                        const file = e.dataTransfer.files?.[0]
                        if (file) {
                          const input = e.currentTarget.querySelector('input')
                          const dataTransfer = new DataTransfer()
                          dataTransfer.items.add(file)
                          input.files = dataTransfer.files
                          handleImageUpload({ target: { files: dataTransfer.files } })
                        }
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        style={{ display: 'none' }}
                      />
                      <div>
                        {uploading ? (
                          <>
                            <div style={{ marginBottom: '8px' }}>⏳ Загрузка...</div>
                            <div className="spinner" style={{ margin: '0 auto' }}></div>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📸</div>
                            <div style={{ fontSize: '14px', color: '#666' }}>
                              Кликни чтобы выбрать фото<br />
                              или перетащи файл сюда
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                  )}
                </div>
              </div>

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
              <div className="form-group">
                <label>Цена *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Категория</label>
                <select value={formData.category_id || ''} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                  <option value="">-- Выбрать --</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Отмена</button>
                <button type="submit" className="btn-primary" disabled={uploading}>Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
