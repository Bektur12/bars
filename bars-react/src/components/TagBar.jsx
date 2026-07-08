export default function TagBar() {
  const tags = [
    'BARŚ SS/26', 'NEW DROP', 'СОЗДАНО ДЛЯ АМБИЦИОЗНЫХ', 'CASUAL',
    'BARŚ SS/26', 'NEW DROP', 'СОЗДАНО ДЛЯ АМБИЦИОЗНЫХ', 'CASUAL',
  ]

  return (
    <div className="tagbar">
      <div className="tagbar-track">
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
