export default function ProductGrid({ products, onAddToCart }) {
  const money = (n) => n.toLocaleString('ru-RU') + ' с'

  const renderIcon = (type) => {
    const icons = {
      tee: <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.5"><path d="M16 6 L4 14 L9 22 L14 18 L14 42 H34 V18 L39 22 L44 14 L32 6 L28 10 H20 Z" /></svg>,
      polo: <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.5"><path d="M16 6 L4 14 L9 22 L14 18 L14 42 H34 V18 L39 22 L44 14 L32 6 L28 10 L24 14 L20 10 Z" /></svg>,
      hoodie: <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.5"><path d="M24 4 C17 4 13 9 13 14 L4 18 L8 27 L13 24 V42 H35 V24 L40 27 L44 18 L35 14 C35 9 31 4 24 4 Z" /></svg>,
    }
    return icons[type] || null
  }

  return (
    <section id="new">
      <div className="wrap">
        <div className="section-head">
          <h2>Новый дроп</h2>
          <p>
            Ограниченная партия SS/26. Разбирают быстро — как всегда.
          </p>
        </div>
        <div className="grid">
          {products.map(product => (
            <div key={product.id} className="card" id={`grid-${product.cat}`}>
              <div className="card-media" style={{ background: product.bg || 'transparent' }}>
                {product.image ? (
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  renderIcon(product.icon)
                )}
                {product.price > 0 && (
                  <span className="tag">{money(product.price)}</span>
                )}
                <button
                  className="card-add"
                  onClick={() => onAddToCart(product.id)}
                >
                  В корзину
                </button>
              </div>
              <div className="card-body">
                <span className="eyebrow">{product.cat}</span>
                <h3>{product.name}</h3>
                {product.price > 0 && (
                  <div className="card-price">{money(product.price)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
