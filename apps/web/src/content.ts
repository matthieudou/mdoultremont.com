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
  prompt?: string
  summary: string
}

export type Photograph = { src: string; title: string; location: string }

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

type Profile = {
  name: string
  firstName: string
  lastName: string
  email: string
  location: string
  linkedin: string
  professionalPortrait: string
  photographyPortrait: string
  available: boolean
  availabilityLabel: string
  professionalEyebrow: string
  professionalIntroduction: string
}

type PageCopy = {
  professionalStatement: string
  professionalHeroImage: string
  experienceEyebrow: string
  experienceTitle: string
  experienceIntroduction: string
  nextChapterEyebrow: string
  nextChapterTitle: string
  nextChapterImage: string
  photographyEyebrow: string
  photographyTitle: string
  photographyIntroduction: string
  personalEyebrow: string
  personalTitle: string
  personalIntroduction: string
  personalTimelineEyebrow: string
  personalTimelineTitle: string
  personalTimelineIntroduction: string
  familyTitle: string
  familyIntroduction: string
  flightTitle: string
  cookingTitle: string
}

type ContentSource = {
  profile: unknown
  pages: unknown
  experiences: unknown
  photographs: unknown
  flights: unknown
  places: unknown
  lifeEvents: unknown
}

type PortfolioContent = {
  profile: Profile
  pageCopy: PageCopy
  experiences: Experience[]
  photographs: Photograph[]
  flights: Flight[]
  places: Place[]
  lifeEvents: LifeEvent[]
}

export class ContentValidationError extends Error {
  constructor(path: string, expectation: string) {
    super(`${path} ${expectation}`)
    this.name = "ContentValidationError"
  }
}

export function createPortfolioContent(
  source: ContentSource
): PortfolioContent {
  return {
    profile: createProfile(source.profile),
    pageCopy: createPageCopy(source.pages),
    experiences: publishedByOrder(
      source.experiences,
      "experiences",
      (record, path) => {
        const startDate = requiredDate(record.startDate, `${path}.startDate`)
        const endDate = optionalDate(record.endDate, `${path}.endDate`)

        if (endDate && endDate < startDate) {
          throw new ContentValidationError(
            `${path}.endDate`,
            "must not be earlier than startDate"
          )
        }

        return {
          company: requiredString(record.company, `${path}.company`),
          role: requiredString(record.role, `${path}.role`),
          period: formatPeriod(startDate, endDate),
          summary: requiredString(record.summary, `${path}.summary`),
        }
      },
      (item) => item.company
    ),
    photographs: publishedByOrder(
      source.photographs,
      "photographs",
      (record, path) => ({
        src: requiredString(record.src, `${path}.src`),
        title: requiredString(record.title, `${path}.title`),
        location: requiredString(record.location, `${path}.location`),
      }),
      (item) => item.title
    ),
    flights: publishedByOrder(
      source.flights,
      "flights",
      (record, path) => ({
        name: requiredString(record.name, `${path}.name`),
        flownAt: requiredDate(record.flownAt, `${path}.flownAt`),
        launchName: requiredString(record.launchName, `${path}.launchName`),
        distanceMeters: requiredPositiveNumber(
          record.distanceMeters,
          `${path}.distanceMeters`
        ),
        durationSeconds: requiredPositiveNumber(
          record.durationSeconds,
          `${path}.durationSeconds`
        ),
        maxAltitudeMeters: requiredPositiveNumber(
          record.maxAltitudeMeters,
          `${path}.maxAltitudeMeters`
        ),
        maxSpeedKph: requiredPositiveNumber(
          record.maxSpeedKph,
          `${path}.maxSpeedKph`
        ),
        trace: optionalString(record.trace, `${path}.trace`),
      }),
      (item) => item.name
    ),
    places: publishedByOrder(
      source.places,
      "places",
      (record, path) => ({
        name: requiredString(record.name, `${path}.name`),
        country: requiredString(record.country, `${path}.country`),
        visitedAt: requiredDate(record.visitedAt, `${path}.visitedAt`),
        description: requiredString(record.description, `${path}.description`),
      }),
      (item) => item.name
    ),
    lifeEvents: publishedByOrder(
      source.lifeEvents,
      "lifeEvents",
      (record, path) => ({
        title: requiredString(record.title, `${path}.title`),
        eventAt: requiredDate(record.eventAt, `${path}.eventAt`),
        location: requiredString(record.location, `${path}.location`),
        description: requiredString(record.description, `${path}.description`),
      }),
      (item) => item.title
    ),
  }
}

function createProfile(value: unknown): Profile {
  const profile = requiredObject(value, "profile")
  return {
    name: requiredString(profile.name, "profile.name"),
    firstName: requiredString(profile.firstName, "profile.firstName"),
    lastName: requiredString(profile.lastName, "profile.lastName"),
    email: requiredString(profile.email, "profile.email"),
    location: requiredString(profile.location, "profile.location"),
    linkedin: requiredString(profile.linkedin, "profile.linkedin"),
    professionalPortrait: requiredString(
      profile.professionalPortrait,
      "profile.professionalPortrait"
    ),
    photographyPortrait: requiredString(
      profile.photographyPortrait,
      "profile.photographyPortrait"
    ),
    available: requiredBoolean(profile.available, "profile.available"),
    availabilityLabel: requiredString(
      profile.availabilityLabel,
      "profile.availabilityLabel"
    ),
    professionalEyebrow: requiredString(
      profile.professionalEyebrow,
      "profile.professionalEyebrow"
    ),
    professionalIntroduction: requiredString(
      profile.professionalIntroduction,
      "profile.professionalIntroduction"
    ),
  }
}

function createPageCopy(value: unknown): PageCopy {
  const page = requiredObject(value, "pages")
  return {
    professionalStatement: requiredString(
      page.professionalStatement,
      "pages.professionalStatement"
    ),
    professionalHeroImage: requiredString(
      page.professionalHeroImage,
      "pages.professionalHeroImage"
    ),
    experienceEyebrow: requiredString(
      page.experienceEyebrow,
      "pages.experienceEyebrow"
    ),
    experienceTitle: requiredString(
      page.experienceTitle,
      "pages.experienceTitle"
    ),
    experienceIntroduction: requiredString(
      page.experienceIntroduction,
      "pages.experienceIntroduction"
    ),
    nextChapterEyebrow: requiredString(
      page.nextChapterEyebrow,
      "pages.nextChapterEyebrow"
    ),
    nextChapterTitle: requiredString(
      page.nextChapterTitle,
      "pages.nextChapterTitle"
    ),
    nextChapterImage: requiredString(
      page.nextChapterImage,
      "pages.nextChapterImage"
    ),
    photographyEyebrow: requiredString(
      page.photographyEyebrow,
      "pages.photographyEyebrow"
    ),
    photographyTitle: requiredString(
      page.photographyTitle,
      "pages.photographyTitle"
    ),
    photographyIntroduction: requiredString(
      page.photographyIntroduction,
      "pages.photographyIntroduction"
    ),
    personalEyebrow: requiredString(
      page.personalEyebrow,
      "pages.personalEyebrow"
    ),
    personalTitle: requiredString(page.personalTitle, "pages.personalTitle"),
    personalIntroduction: requiredString(
      page.personalIntroduction,
      "pages.personalIntroduction"
    ),
    personalTimelineEyebrow: requiredString(
      page.personalTimelineEyebrow,
      "pages.personalTimelineEyebrow"
    ),
    personalTimelineTitle: requiredString(
      page.personalTimelineTitle,
      "pages.personalTimelineTitle"
    ),
    personalTimelineIntroduction: requiredString(
      page.personalTimelineIntroduction,
      "pages.personalTimelineIntroduction"
    ),
    familyTitle: requiredString(page.familyTitle, "pages.familyTitle"),
    familyIntroduction: requiredString(
      page.familyIntroduction,
      "pages.familyIntroduction"
    ),
    flightTitle: requiredString(page.flightTitle, "pages.flightTitle"),
    cookingTitle: requiredString(page.cookingTitle, "pages.cookingTitle"),
  }
}

function publishedByOrder<T>(
  value: unknown,
  path: string,
  createItem: (record: Record<string, unknown>, path: string) => T,
  key: (item: T) => string
): T[] {
  const records = requiredArray(value, path)
  const items: Array<{ item: T; order: number }> = []
  const orders = new Set<number>()
  const keys = new Set<string>()

  for (const [index, recordValue] of records.entries()) {
    const recordPath = `${path}[${index}]`
    const record = requiredObject(recordValue, recordPath)

    if (!requiredBoolean(record.published, `${recordPath}.published`)) continue

    const order = requiredPositiveInteger(record.order, `${recordPath}.order`)
    if (orders.has(order)) {
      throw new ContentValidationError(`${recordPath}.order`, "must be unique")
    }
    orders.add(order)

    const item = createItem(record, recordPath)
    const itemKey = key(item)
    if (keys.has(itemKey)) {
      throw new ContentValidationError(recordPath, "must have a unique name")
    }
    keys.add(itemKey)
    items.push({ item, order })
  }

  // oxlint-disable-next-line unicorn/no-array-sort -- sorting a copy keeps the parsed records immutable.
  return [...items].sort((a, b) => a.order - b.order).map(({ item }) => item)
}

function requiredObject(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ContentValidationError(path, "must be an object")
  }
  return value as Record<string, unknown>
}

function requiredArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new ContentValidationError(path, "must be an array")
  }
  return value
}

function requiredString(value: unknown, path: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new ContentValidationError(path, "must be a non-empty string")
  }
  return value
}

function optionalString(value: unknown, path: string): string | undefined {
  if (value === undefined || value === "") return undefined
  return requiredString(value, path)
}

function requiredBoolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") {
    throw new ContentValidationError(path, "must be a boolean")
  }
  return value
}

function requiredPositiveInteger(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new ContentValidationError(path, "must be a positive integer")
  }
  return value
}

function requiredPositiveNumber(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    throw new ContentValidationError(path, "must be a positive number")
  }
  return value
}

function requiredDate(value: unknown, path: string): string {
  const date = requiredString(value, path)
  if (!isIsoDate(date)) {
    throw new ContentValidationError(path, "must be an ISO date")
  }
  return date
}

function optionalDate(value: unknown, path: string): string | undefined {
  if (value === "" || value === undefined) return undefined
  return requiredDate(value, path)
}

function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T12:00:00Z`)
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  )
}

function formatPeriod(startDate: string, endDate?: string) {
  const format = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
  const start = format.format(new Date(`${startDate}T12:00:00Z`))
  return `${start} – ${endDate ? format.format(new Date(`${endDate}T12:00:00Z`)) : "Present"}`
}

const portfolioContent = createPortfolioContent({
  profile: profileData,
  pages: pagesData,
  experiences: experiencesData,
  photographs: photographsData,
  flights: flightsData,
  places: placesData,
  lifeEvents: lifeEventsData,
})

export const {
  profile,
  pageCopy,
  experiences,
  photographs,
  flights,
  places,
  lifeEvents,
} = portfolioContent
