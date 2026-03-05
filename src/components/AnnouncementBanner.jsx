import { marqueeText } from '../constants/data'

export default function AnnouncementBanner() {
  return (
    <div className="marquee-banner">
      <div className="marquee-content">
        {[...Array(12)].map((_, i) => (
          <span key={i}>{marqueeText}</span>
        ))}
      </div>
    </div>
  )
}
