import barsvideo from '../assets/barsvideo.mp4'

export default function Hero() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
      >
        <source src={barsvideo} type="video/mp4" />
      </video>
      <div className="wrap hero-inner">
        <span className="eyebrow">Бренд мужской одежды · Casual</span>
        <h1 style={{ marginTop: '18px' }}>
          Создано<br />для <span className="accent">амбициозных</span>
        </h1>
        <p className="hero-sub">
          BARŚ — казуальная одежда для тех, кто идёт своим маршрутом.
          Плотный хлопок, чёткий крой, минимум лишнего. Как барс —
          тихо, точно, без права на ошибку.
        </p>
        <div className="hero-cta">
          <a href="#catalog" className="btn btn-primary">Смотреть коллекцию</a>
          <a href="#story" className="btn btn-ghost">О бренде</a>
        </div>
        <div className="hero-stats">
          <div><b>10,3К</b><span>Подписчиков</span></div>
          <div><b>184</b><span>Публикаций</span></div>
          <div><b>SS/26</b><span>Актуальный дроп</span></div>
        </div>
      </div>
    </section>
  )
}
