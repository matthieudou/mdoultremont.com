import { describe, expect, test } from "vitest"
import experiences from "../content/experiences.json"
import flights from "../content/flights.json"
import lifeEvents from "../content/life-events.json"
import pages from "../content/pages.json"
import photographs from "../content/photography.json"
import places from "../content/places.json"
import profile from "../content/profile.json"
import { ContentValidationError, createPortfolioContent } from "./content"

function contentSource() {
  return structuredClone({
    profile,
    pages,
    experiences,
    photographs,
    flights,
    places,
    lifeEvents,
  })
}

describe("portfolio content", () => {
  test("publishes ordered experience records and derives their periods", () => {
    const content = createPortfolioContent(contentSource())

    expect(content.experiences.slice(0, 2)).toMatchObject([
      { company: "Atlassian", period: "Aug 2025 – Present" },
      { company: "Cycle", period: "Oct 2024 – Aug 2025" },
    ])
  })

  test("excludes incomplete unpublished records", () => {
    const content = createPortfolioContent(contentSource())

    expect(content.places).toEqual([])
    expect(content.lifeEvents).toEqual([])
  })

  test("rejects a published experience without a summary", () => {
    const source = contentSource()
    source.experiences[0].summary = ""

    expect(() => createPortfolioContent(source)).toThrow(ContentValidationError)
    expect(() => createPortfolioContent(source)).toThrow(
      "experiences[0].summary must be a non-empty string"
    )
  })

  test("rejects duplicate published display orders", () => {
    const source = contentSource()
    source.experiences[1].order = source.experiences[0].order

    expect(() => createPortfolioContent(source)).toThrow(
      "experiences[1].order must be unique"
    )
  })
})
