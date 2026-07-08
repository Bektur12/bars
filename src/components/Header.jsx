export default function Header({ cartCount, onCartClick }) {
  return (
    <header>
      <nav className="wrap">
        <a href="#" className="logo">BARŚ<sup>SS26</sup></a>
        <ul className="navlinks">
          <li><a href="#new">Новинки</a></li>
          <li><a href="#catalog">Каталог</a></li>
          <li><a href="#story">О бренде</a></li>
          <li><a href="#contact">Контакты</a></li>
        </ul>
        <div className="navright">
          <button className="cart-btn" onClick={onCartClick}>
            Корзина <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
