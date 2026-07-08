import { useState } from 'react'

export default function Newsletter({ onSubscribe }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubscribe()
    setEmail('')
  }

  return (
    <section>
      <div className="wrap">
        <div className="news">
          <h2>Узнавай о дропах первым</h2>
          <form className="news-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Твоя почта" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Подписаться</button>
          </form>
        </div>
      </div>
    </section>
  )
}
