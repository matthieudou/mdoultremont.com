import { Switch } from "@base-ui/react/switch"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { SiteShell } from "../components/site-shell"
import { flights, lifeEvents, pageCopy, places } from "../content"
import type { Flight } from "../content"

export const Route = createFileRoute("/personal")({ component: PersonalPage })

type PersonalTimelineItem = {
  id: string
  kind: "flight" | "visit" | "life"
  date: string
  title: string
  location: string
  description: string
  flight?: Flight
}

function PersonalPage() {
  const [showFlights, setShowFlights] = useState(false)
  const timeline = createTimeline().filter(
    (item) => showFlights || item.kind !== "flight"
  )

  return (
    <SiteShell>
      <main>
        <section className="page-rails page-hero">
          <div className="section-inner page-hero-grid">
            <div>
              <p className="eyebrow">{pageCopy.personalEyebrow}</p>
              <h1 className="display">{pageCopy.personalTitle}</h1>
            </div>
            <p className="lede">{pageCopy.personalIntroduction}</p>
          </div>
        </section>
        <section className="page-rails timeline-section">
          <div className="section-inner">
            <header className="timeline-header">
              <div>
                <p className="eyebrow">{pageCopy.personalTimelineEyebrow}</p>
                <h2 className="display">{pageCopy.personalTimelineTitle}</h2>
                <p className="lede mt-5 max-w-xl">
                  {pageCopy.personalTimelineIntroduction}
                </p>
              </div>
              <div className="switch-label">
                Show flights
                <Switch.Root
                  aria-label="Show flights in the timeline"
                  className="relative h-6 w-10 cursor-pointer rounded-full bg-[#dcdad5] p-1 transition-colors data-[checked]:bg-[#f43f3c]"
                  checked={showFlights}
                  onCheckedChange={setShowFlights}
                >
                  <Switch.Thumb className="block size-4 rounded-full bg-white shadow-sm transition-transform data-[checked]:translate-x-4" />
                </Switch.Root>
              </div>
            </header>
            <div className="timeline-list">
              {timeline.map((item) => (
                <details className="timeline-item" key={item.id}>
                  <summary>
                    <span className="timeline-date">
                      <time dateTime={item.date || undefined}>
                        {formatDate(item.date)}
                      </time>
                    </span>
                    <span>
                      <strong className="timeline-title">{item.title}</strong>
                      <span className="timeline-location">
                        {timelineLabels[item.kind]}
                        {item.location && ` · ${item.location}`}
                      </span>
                    </span>
                    <span className="timeline-toggle" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="timeline-body">
                    <p>{item.description}</p>
                    {item.flight && (
                      <div className="timeline-stats">
                        <span>
                          {formatDistance(item.flight.distanceMeters)}
                        </span>
                        <span>
                          {formatDuration(item.flight.durationSeconds)}
                        </span>
                        <span>
                          {item.flight.maxAltitudeMeters.toLocaleString("en")} m
                        </span>
                        <span>{item.flight.maxSpeedKph} km/h</span>
                      </div>
                    )}
                    {item.kind === "visit" && (
                      <p className="mt-3 text-sm italic">
                        Photos and the full travel entry will live here later.
                      </p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}

const timelineLabels = {
  flight: "Flight",
  visit: "Visit",
  life: "Life event",
} as const

function createTimeline(): PersonalTimelineItem[] {
  const items: PersonalTimelineItem[] = [
    ...flights.map((flight) => ({
      id: `flight-${flight.name}-${flight.flownAt}`,
      kind: "flight" as const,
      date: flight.flownAt,
      title: flight.name,
      location: flight.launchName,
      description: `${formatDuration(flight.durationSeconds)} in the air, with a maximum altitude of ${flight.maxAltitudeMeters.toLocaleString("en")} metres.`,
      flight,
    })),
    ...places.map((place) => ({
      id: `visit-${place.name}`,
      kind: "visit" as const,
      date: place.visitedAt,
      title: place.name,
      location: place.country,
      description: place.description,
    })),
    ...lifeEvents.map((event) => ({
      id: `life-${event.title}`,
      kind: "life" as const,
      date: event.eventAt,
      title: event.title,
      location: event.location,
      description: event.description,
    })),
  ]
  // oxlint-disable-next-line unicorn/no-array-sort -- `items` is a new local array.
  return items.sort((a, b) => b.date.localeCompare(a.date))
}

function formatDate(date: string) {
  if (!date) return "Date to add"
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`))
}

function formatDistance(meters: number) {
  return `${new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(meters / 1_000)} km`
}
function formatDuration(seconds: number) {
  return `${Math.round(seconds / 60)} min`
}
