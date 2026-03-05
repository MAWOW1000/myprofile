import { merchantsItems } from '../constants/data'

export default function MerchantsStrip() {
  const doubled = [...merchantsItems, ...merchantsItems]

  return (
    <div className="merchants-strip">
      <div className="merchants-track">
        {doubled.map((item, i) => (
          <div key={i} className="merchants-item">
            {item.type === 'label' ? (
              <span className="merchants-label">{item.text}</span>
            ) : (
              <div className={`merchants-avatar merchants-avatar--${item.variant}`}>
                <div className="merchants-avatar-inner">{item.letter}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
