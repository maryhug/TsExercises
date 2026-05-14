import type { ComponentType } from 'react'

import Day01 from './days/day-01/App'
import Day02 from './days/day-02/App'

export type DayId = 'day-01' | 'day-02'

export interface DayDefinition {
  id: DayId
  title: string
  subtitle: string
  Component: ComponentType
}

export const days: DayDefinition[] = [
  {
    id: 'day-01',
    title: 'Día 01',
    subtitle: 'Contador + formulario básico',
    Component: Day01,
  },
  {
    id: 'day-02',
    title: 'Día 02',
    subtitle: 'Práctica de React Hooks',
    Component: Day02,
  },
]

export const defaultDayId: DayId = days[0]!.id

export function isDayId(value: string): value is DayId {
  return days.some((day) => day.id === value)
}

export function getDayById(id: string): DayDefinition {
  return days.find((day) => day.id === id) ?? days[0]!
}
