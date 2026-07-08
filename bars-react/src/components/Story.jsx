import bbbImage from '../assets/ббб.jpg'

export default function Story() {
  return (
    <section id="story">
      <div className="wrap">
        <div className="story">
          <div className="story-media">
            <img src={bbbImage} alt="BARŚ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <span className="eyebrow">О бренде</span>
            <h2 style={{ marginTop: '14px' }}>Барс не бежит толпой</h2>
            <p>
              Барс (снежный леопард) — символ терпения и точного расчёта: он выбирает момент и не ошибается. Так и BARŚ — мы не гонимся за трендами каждую неделю, а собираем немногочисленные, но выверенные капсулы: плотные футболки, поло, худи и авторские очки.
            </p>
            <p>
              Каждая вещь проходит через реальную студию бренда — от примерки на своих людях до финальной партии, которая уходит в шоу-рум и на сайт.
            </p>
            <div className="story-stats">
              <div><b>184</b><span>Дропов и постов</span></div>
              <div><b>SS26</b><span>Текущий сезон</span></div>
              <div><b>100%</b><span>Хлопок в футболках</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
