export default function Cart({
  isOpen,
  onClose,
  cartItems,
  products,
  onChangeQty,
  onRemoveItem,
  onCheckout,
}) {
  const money = (n) => n.toLocaleString('ru-RU') + ' с'

  const renderIcon = (type) => {
    const icons = {
      tee: <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.5"><path d="M16 6 L4 14 L9 22 L14 18 L14 42 H34 V18 L39 22 L44 14 L32 6 L28 10 H20 Z" /></svg>,
      polo: <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.5"><path d="M16 6 L4 14 L9 22 L14 18 L14 42 H34 V18 L39 22 L44 14 L32 6 L28 10 L24 14 L20 10 Z" /></svg>,
      hoodie: <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.5"><path d="M24 4 C17 4 13 9 13 14 L4 18 L8 27 L13 24 V42 H35 V24 L40 27 L44 18 L35 14 C35 9 31 4 24 4 Z" /></svg>,
    }
    return icons[type] || null
  }

  const total = Object.entries(cartItems).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === id)
    return sum + (product ? product.price * qty : 0)
  }, 0)

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-head">
          <h3>Корзина</h3>
          <button className="drawer-close" onClick={onClose}>&times;</button>
        </div>
        <div className="drawer-items">
          {Object.entries(cartItems).length === 0 ? (
            <div className="drawer-empty">Корзина пуста.<br />Барс терпелив — но не бесконечно.</div>
          ) : (
            Object.entries(cartItems).map(([id, qty]) => {
              const product = products.find(p => p.id === id)
              if (!product) return null
              return (
                <div key={id} className="drawer-item">
                  <div className="di-media" style={{ background: product.bg }}>
                    {renderIcon(product.icon)}
                  </div>
                  <div className="di-info">
                    <div>
                      <span className="eyebrow">{product.cat}</span>
                      <h4>{product.name}</h4>
                    </div>
                    <div className="di-row">
                      <div className="qty">
                        <button onClick={() => onChangeQty(id, -1)}>−</button>
                        <span>{qty}</span>
                        <button onClick={() => onChangeQty(id, 1)}>+</button>
                      </div>
                      <span className="di-price">{money(product.price * qty)}</span>
                    </div>
                    <button className="di-remove" onClick={() => onRemoveItem(id)}>Удалить</button>
                  </div>
                </div>
              )
            })
          )}
        </div>
        <div className="drawer-foot">
          <div className="drawer-sub">
            <span>Итого</span><b id="drawerTotal">{money(total)}</b>
          </div>
          <button className="btn btn-primary" onClick={onCheckout}>
            Оформить заказ
          </button>
        </div>
      </aside>
    </>
  )
}
