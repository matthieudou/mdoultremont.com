import experiencesData from "../content/experiences.json"
import flightsData from "../content/flights.json"
import lifeEventsData from "../content/life-events.json"
import pagesData from "../content/pages.json"
import photographsData from "../content/photography.json"
import placesData from "../content/places.json"
import profileData from "../content/profile.json"

export type Experience = {
  company: string
  role: string
  period: string
  accent: "lime" | "orange" | "lilac" | "blue"
  summary: string
  prompt: string
}

export type Photograph = {
  src: string
  title: string
  location: string
}

export type Flight = {
  name: string
  flownAt: string
  launchName: string
  distanceMeters: number
  durationSeconds: number
  maxAltitudeMeters: number
  maxSpeedKph: number
  trace?: string
}

export type Place = {
  name: string
  country: string
  visitedAt: string
  description: string
}

export type LifeEvent = {
  title: string
  eventAt: string
  location: string
  description: string
}

type Published = {
  published: boolean
  order: number
}

const publishedByOrder = <T extends Published>(items: T[]) => {
  const publishedItems = items.filter((item) => item.published)
  // oxlint-disable-next-line unicorn/no-array-sort -- filter already returned a new array.
  return publishedItems.sort((a, b) => a.order - b.order)
}

export const profile = profileData
export const pageCopy = pagesData

export const experiences = publishedByOrder(experiencesData) as Experience[]

export const photographs = publishedByOrder(photographsData) as Photograph[]

export const places = publishedByOrder(placesData) as Place[]

export const flights = publishedByOrder(flightsData) as Flight[]

export const lifeEvents = publishedByOrder(lifeEventsData) as LifeEvent[]
