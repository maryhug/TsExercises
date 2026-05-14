import { useEffect, useState } from 'react'

import './App.css'
import { days, defaultDayId, getDayById, isDayId } from './dayRegistry'

function App() {
  const [activeDayId, setActiveDayId] = useState(() => {
    if (typeof window === 'undefined') return defaultDayId

    const hash = window.location.hash.replace('#', '').trim()

    return isDayId(hash) ? hash : defaultDayId
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim()
      setActiveDayId(isDayId(hash) ? hash : defaultDayId)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const activeDay = getDayById(activeDayId)
  const ActiveDayComponent = activeDay.Component

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">Clases</div>

        <nav aria-label="Lista de días">
          <p className="sidebar__section-label">Días disponibles</p>
          <ul className="sidebar__list">
            {days.map((day) => (
              <li key={day.id}>
                <a
                  className={`sidebar__item${day.id === activeDayId ? ' sidebar__item--active' : ''}`}
                  href={`#${day.id}`}
                >
                  <span className="sidebar__item-title">{day.title}</span>
                  <span className="sidebar__item-subtitle">{day.subtitle}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <ActiveDayComponent />
      </main>
    </div>
  )
}

export default App
