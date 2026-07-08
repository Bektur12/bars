export default function AdminNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'products', label: '📦 Товары', icon: '📦' },
    { id: 'categories', label: '🏷️ Категории', icon: '🏷️' },
  ]

  return (
    <nav className="admin-nav">
      <div className="admin-header">
        <h1>BARŚ Admin</h1>
        <a href="/" className="back-link">← На сайт</a>
      </div>
      <ul className="admin-tabs">
        {tabs.map(tab => (
          <li key={tab.id}>
            <button
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
