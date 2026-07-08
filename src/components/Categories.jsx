export default function Categories() {
  return (
    <section id="catalog">
      <div className="wrap">
        <div className="section-head">
          <h2>Категории</h2>
          <p>
            От базовых футболок до очков — вся линейка BARŚ в одном месте.
          </p>
        </div>
        <div className="cat-grid">
          <a href="#grid-tees" className="cat-card">
            <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.6">
              <path d="M16 6 L4 14 L9 22 L14 18 L14 42 H34 V18 L39 22 L44 14 L32 6 L28 10 H20 Z" />
            </svg>
            <span className="count">01</span>
            <b>Футболки</b>
          </a>

          <a href="#grid-glasses" className="cat-card">
            <svg viewBox="0 0 48 48" fill="none" stroke="#0b0c0f" strokeWidth="1.6">
              <circle cx="13" cy="24" r="8" />
              <circle cx="35" cy="24" r="8" />
              <path d="M21 24 H27 M5 22 L8 18 M43 22 L40 18" />
            </svg>
            <span className="count">02</span>
            <b>Очки</b>
          </a>

          <a href="#grid-polo" className="cat-card">
            <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.6">
              <path d="M16 6 L4 14 L9 22 L14 18 L14 42 H34 V18 L39 22 L44 14 L32 6 L28 10 L24 14 L20 10 Z" />
            </svg>
            <span className="count">03</span>
            <b>Поло</b>
          </a>

          <a href="#grid-hoodie" className="cat-card">
            <svg viewBox="0 0 48 48" fill="none" stroke="#f6f4ee" strokeWidth="1.6">
              <path d="M24 4 C17 4 13 9 13 14 L4 18 L8 27 L13 24 V42 H35 V24 L40 27 L44 18 L35 14 C35 9 31 4 24 4 Z" />
              <path d="M24 4 C24 10 24 13 24 16" />
            </svg>
            <span className="count">04</span>
            <b>Худи</b>
          </a>
        </div>
      </div>
    </section>
  )
}
