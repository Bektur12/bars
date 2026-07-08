export default function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-col">
            <span className="logo" style={{ fontSize: '22px' }}>BARŚ</span>
            <p style={{ marginTop: '14px', maxWidth: '220px' }}>
              Бренд мужской одежды. Casual. Создано для амбициозных.
            </p>
          </div>
          <div className="foot-col">
            <h4>Каталог</h4>
            <a href="#grid-tees">Футболки</a>
            <a href="#grid-polo">Поло</a>
            <a href="#grid-hoodie">Худи</a>
            <a href="#grid-glasses">Очки</a>
          </div>
          <div className="foot-col">
            <h4>Бренд</h4>
            <a href="#story">О нас</a>
            <a href="#">Доставка</a>
            <a href="#">Возврат</a>
          </div>
          <div className="foot-col">
            <h4>Соцсети</h4>
            <a href="#">Instagram — @barss.official</a>
            <a href="#">TikTok</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 BARŚ. Все права защищены.</span>
          <span>Прототип магазина · сделан для демонстрации</span>
        </div>
      </div>
    </footer>
  )
}
