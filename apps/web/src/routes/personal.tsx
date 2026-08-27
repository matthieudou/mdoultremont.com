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
  const timeline = createTimeline()
  const [showFlights, setShowFlights] = useState(false)
  const visibleTimeline = showFlights
    ? timeline
    : timeline.filter((item) => item.kind !== "flight")

  return (
    <SiteShell>
      <main>
        <section className="relative grid min-h-[610px] grid-cols-[0.35fr_1.25fr_0.6fr] items-end gap-8 overflow-hidden bg-[#111714] bg-[radial-gradient(circle_at_78%_28%,rgba(140,220,255,0.22),transparent_28rem),radial-gradient(circle_at_18%_80%,rgba(255,139,97,0.16),transparent_25rem)] px-[clamp(1.5rem,5vw,5.5rem)] pt-[clamp(10rem,16vw,14rem)] pb-[clamp(4rem,7vw,7rem)] text-white after:absolute after:top-32 after:right-[7%] after:size-[22rem] after:rounded-full after:border after:border-white/15 after:shadow-[0_0_70px_rgba(140,220,255,0.12),inset_0_0_70px_rgba(181,173,255,0.06)] after:content-[''] max-[1050px]:grid-cols-[1fr_2fr] max-[760px]:min-h-[540px] max-[760px]:grid-cols-1 max-[760px]:pt-36">
          <p className="relative z-1 m-0 text-[0.7rem] font-semibold tracking-[0.13em] uppercase">
            {pageCopy.personalEyebrow}
          </p>
          <h1 className="relative z-1 m-0 max-w-[9ch] text-[clamp(4rem,8vw,9rem)] leading-[0.8] font-[470] tracking-[-0.075em]">
            {pageCopy.personalTitle}
          </h1>
          <p className="relative z-1 m-0 text-[0.96rem] leading-[1.55] text-white/55 max-[1050px]:col-start-2 max-[760px]:col-auto">
            {pageCopy.personalIntroduction}
          </p>
        </section>

        <section className="relative overflow-hidden bg-[#e6e9e5] bg-[radial-gradient(circle_at_8%_18%,rgba(181,173,255,0.18),transparent_29rem),radial-gradient(circle_at_92%_70%,rgba(140,220,255,0.16),transparent_32rem)] px-[clamp(1rem,5vw,5rem)] py-[clamp(3rem,7vw,7rem)]">
          <div className="mx-auto max-w-245 rounded-3xl border border-white/85 bg-white/80 px-[clamp(1rem,4vw,3.5rem)] py-[clamp(1.5rem,4vw,3rem)] shadow-[0_26px_70px_rgba(37,52,46,0.1)] backdrop-blur-2xl backdrop-saturate-125 max-[760px]:rounded-[1.1rem] max-[760px]:px-4 max-[760px]:py-5">
            <header className="flex items-end justify-between gap-8 border-b border-[#121c1817] pb-5 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-5">
              <div>
                <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.13em] uppercase">
                  {pageCopy.personalTimelineEyebrow}
                </p>
                <h2 className="m-0 text-[clamp(1.8rem,3vw,2.65rem)] leading-none font-medium tracking-[-0.045em]">
                  {pageCopy.personalTimelineTitle}
                </h2>
              </div>

              <div className="inline-flex items-center gap-3 text-[0.78rem] font-medium whitespace-nowrap text-[#25302c] max-[760px]:w-full max-[760px]:justify-between">
                <span>Show flights</span>
                <Switch.Root
                  aria-label="Show flights in the timeline"
                  className="relative h-[1.35rem] w-[2.35rem] cursor-pointer rounded-full border-0 bg-[#121c182e] p-[0.16rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2f6fe4] data-[checked]:bg-[#2f6fe4]"
                  checked={showFlights}
                  onCheckedChange={setShowFlights}
                >
                  <Switch.Thumb className="block size-[1.03rem] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.24)] transition-transform data-[checked]:translate-x-4" />
                </Switch.Root>
              </div>
            </header>

            <p className="mt-5 mr-0 mb-4 ml-[3.6rem] max-w-[35rem] text-[0.8rem] leading-normal text-[#6f7772] max-[760px]:ml-[2.9rem]">
              {pageCopy.personalTimelineIntroduction}
            </p>

            <div className="relative mt-2">
              {visibleTimeline.map((item) => (
                <details
                  className="group relative border-b border-[#121c1821] before:absolute before:top-0 before:bottom-0 before:left-4 before:z-0 before:w-px before:bg-[#121c181a] before:content-['']"
                  key={item.id}
                >
                  <summary className="group/summary relative z-1 grid min-h-[82px] cursor-pointer list-none grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-[0.9rem] py-3 [--summary-marker:none] max-[760px]:min-h-[84px] max-[760px]:grid-cols-[2rem_minmax(0,1fr)_1.8rem] max-[760px]:gap-3 [&::-webkit-details-marker]:hidden">
                    <span
                      className={`grid size-8 place-items-center rounded-full border border-[#121c1821] shadow-[0_0_0_5px_rgba(255,255,255,0.96)] ${timelineIconStyles[item.kind]}`}
                      aria-hidden="true"
                    >
                      <TimelineIcon kind={item.kind} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <strong className="overflow-hidden text-[clamp(0.94rem,1.4vw,1.05rem)] leading-[1.2] font-medium text-ellipsis whitespace-nowrap transition-colors group-hover/summary:text-[#44605a] max-[760px]:whitespace-normal">
                        {item.title}
                      </strong>
                      <span className="overflow-hidden text-[0.73rem] text-ellipsis whitespace-nowrap text-[#6f7772] max-[760px]:whitespace-normal">
                        {timelineLabels[item.kind]}
                        {item.location && ` · ${item.location}`}
                        {" · "}
                        <time dateTime={item.date || undefined}>
                          {formatDate(item.date)}
                        </time>
                      </span>
                    </span>
                    <span
                      className="grid size-8 place-items-center rounded-[0.55rem] border border-[#121c181f] bg-white/50 text-[#6f7772] transition group-open:rotate-180 group-open:text-[#111513] max-[760px]:size-[1.8rem]"
                      aria-hidden="true"
                    >
                      <svg
                        className="size-4 fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
                        viewBox="0 0 16 16"
                      >
                        <path d="m5 6 3 3 3-3" />
                      </svg>
                    </span>
                  </summary>

                  <div className="mt-[-0.25rem] mr-12 mb-0 ml-[2.9rem] pb-6 max-[760px]:mr-10 max-[760px]:ml-11 max-[760px]:pb-6">
                    <p className="m-0 max-w-[42rem] leading-[1.55] text-[#6f7772]">
                      {item.description}
                    </p>

                    {item.flight && (
                      <div className="mt-5 flex flex-wrap items-center gap-2 text-[0.8rem] text-[#25302c]">
                        {[
                          formatDistance(item.flight.distanceMeters),
                          formatDuration(item.flight.durationSeconds),
                          `${item.flight.maxAltitudeMeters.toLocaleString("en")} m`,
                          `${item.flight.maxSpeedKph} km/h`,
                        ].map((stat, index) => (
                          <span
                            className="inline-flex items-center gap-2"
                            key={stat}
                          >
                            {index > 0 && (
                              <span className="text-[#121c1842]">·</span>
                            )}
                            {stat}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.kind === "visit" && (
                      <p className="mt-3! text-[0.78rem] text-[#6f7772] italic">
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

function TimelineIcon({ kind }: { kind: PersonalTimelineItem["kind"] }) {
  if (kind === "flight") {
    return (
      <svg
        className="size-[0.9rem] fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"
        viewBox="0 0 20 20"
      >
        <path d="m3 10 14-6-5 12-2-5-7-1Z" />
      </svg>
    )
  }

  if (kind === "visit") {
    return (
      <svg
        className="size-[0.9rem] fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"
        viewBox="0 0 20 20"
      >
        <path d="M15 8c0 3.5-5 8-5 8s-5-4.5-5-8a5 5 0 1 1 10 0Z" />
        <circle cx="10" cy="8" r="1.5" />
      </svg>
    )
  }

  return (
    <svg
      className="size-[0.9rem] fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"
      viewBox="0 0 20 20"
    >
      <path d="M10 3v14M3 10h14M5 5l10 10M15 5 5 15" />
    </svg>
  )
}

const timelineIconStyles = {
  flight: "bg-[#f8fbff] text-[#3874cf]",
  visit: "bg-[#f7ede7] text-[#9c593d]",
  life: "bg-[#efedfa] text-[#6b63ae]",
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

  // oxlint-disable-next-line unicorn/no-array-sort -- items is a new local array.
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
