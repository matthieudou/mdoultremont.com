import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { SiteShell } from "../components/site-shell"
import { CopyEmailButton } from "../components/copy-email-button"
import { experiences, pageCopy, profile } from "../content"
import iterationCss from "../iterations.css?url"

export const Route = createFileRoute("/iterations")({
  head: () => ({
    meta: [
      { title: "Design iterations · Matthieu" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "stylesheet", href: iterationCss }],
  }),
  component: IterationsPage,
})

const brandColors = ["#3c77ff", "#6566ed", "#547eff", "#438ebd"]
const companyFiles = ["atlassian", "cycle", "kiosk", "smovin"]

function Choices({
  label,
  values,
  value,
  onChange,
}: {
  label: string
  values: string[]
  value: number
  onChange: (index: number) => void
}) {
  return (
    <fieldset className="it-choices">
      <legend>{label}</legend>
      <div>
        {values.map((name, index) => (
          <button
            type="button"
            key={name}
            aria-pressed={index === value}
            onClick={() => onChange(index)}
          >
            {name}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
function Experiment({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="it-experiment" id={id}>
      <div className="it-section-intro">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  )
}
function NavigationSample({ mode }: { mode: number }) {
  const [active, setActive] = useState(0)
  return (
    <div
      className={`it-navigation it-navigation-${mode}`}
      style={{ "--active": active } as CSSProperties}
      aria-label="Navigation style preview"
    >
      {["Professional", "Photography"].map((name, index) => (
        <button
          key={name}
          type="button"
          aria-pressed={active === index}
          onClick={() => setActive(index)}
        >
          {name}
        </button>
      ))}
      <span className="it-nav-indicator" aria-hidden="true" />
    </div>
  )
}
function AvailabilitySample({ mode }: { mode: number }) {
  return (
    <span className={`it-availability it-availability-${mode}`}>
      <span aria-hidden="true" />
      {profile.availabilityLabel}
    </span>
  )
}
function ButtonSample({ mode }: { mode: number }) {
  return (
    <CopyEmailButton className={`it-button it-button-${mode}`}>
      Copy email
    </CopyEmailButton>
  )
}

function IterationsPage() {
  const [hero, setHero] = useState(0)
  const [grain, setGrain] = useState(12)
  const [statement, setStatement] = useState(0)
  const [heading, setHeading] = useState(0)
  const [cards, setCards] = useState(2)
  const [button, setButton] = useState(0)
  const [availability, setAvailability] = useState(0)
  const [navigation, setNavigation] = useState(1)
  const [copiedSummary, setCopiedSummary] = useState("")
  const [copyFailed, setCopyFailed] = useState(false)
  const summary = `Navigation ${navigation + 1}; availability ${availability + 1}; button ${button + 1}; hero ${hero + 1}; grain ${grain}%; statement ${statement + 1}; experience heading ${heading + 1}; cards ${cards + 1}; logos untextured.`
  async function copySelection() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopiedSummary(summary)
      setCopyFailed(false)
    } catch {
      setCopyFailed(true)
    }
  }
  return (
    <SiteShell>
      <main className="it-page">
        <header className="it-intro">
          <p className="section-label">Design workbench</p>
          <h1>
            Small details.
            <br />
            Different directions.
          </h1>
          <p>
            Compare the treatments below. These experiments leave the
            professional and photography pages as they are.
          </p>
          <nav aria-label="Experiments">
            {[
              ["controls", "Navigation & controls"],
              ["hero", "Hero light"],
              ["statement", "Personal statement"],
              ["experience", "Experience"],
            ].map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
            <Link to="/">Current site</Link>
          </nav>
        </header>
        <Experiment
          id="controls"
          title="Navigation & controls"
          description="Click between sections to feel the underline move. Try the buttons to compare their pressed states; they copy the real email address."
        >
          <div className="it-comparisons">
            {[0, 1, 2].map((mode) => (
              <div className="it-specimen" key={mode}>
                <p className="it-variant">
                  {
                    [
                      "1 · Fine sliding line",
                      "2 · Short soft line",
                      "3 · Quiet accent",
                    ][mode]
                  }
                </p>
                <NavigationSample mode={mode} />
              </div>
            ))}
          </div>
          <Choices
            label="Navigation choice"
            values={["1 · Fine", "2 · Short", "3 · Accent"]}
            value={navigation}
            onChange={setNavigation}
          />
          <div className="it-comparisons">
            {[0, 1, 2].map((mode) => (
              <div className="it-specimen" key={mode}>
                <p className="it-variant">
                  {
                    [
                      "1 · Soft enamel",
                      "2 · Inset glass",
                      "3 · Porcelain edge",
                    ][mode]
                  }
                </p>
                <AvailabilitySample mode={mode} />
              </div>
            ))}
          </div>
          <Choices
            label="Availability choice"
            values={["1 · Enamel", "2 · Glass", "3 · Porcelain"]}
            value={availability}
            onChange={setAvailability}
          />
          <div className="it-comparisons">
            {[0, 1, 2].map((mode) => (
              <div className="it-specimen" key={mode}>
                <p className="it-variant">
                  {["1 · Soft bevel", "2 · Raised rim", "3 · Satin dome"][mode]}
                </p>
                <ButtonSample mode={mode} />
              </div>
            ))}
          </div>
          <Choices
            label="Button choice"
            values={["1 · Bevel", "2 · Rim", "3 · Dome"]}
            value={button}
            onChange={setButton}
          />
        </Experiment>
        <Experiment
          id="hero"
          title="Light across the whole hero"
          description="Color and visible grain connect the copy and portrait without a middle divider. Your selected badge and button appear here together."
        >
          <div className="it-toolbar">
            <Choices
              label="Lighting"
              values={[
                "1 · Blue & peach",
                "2 · Lavender haze",
                "3 · Cool daylight",
              ]}
              value={hero}
              onChange={setHero}
            />
            <label className="it-range">
              Background grain <output>{grain}%</output>
              <input
                type="range"
                min="0"
                max="30"
                value={grain}
                onChange={(e) => setGrain(Number(e.target.value))}
              />
            </label>
          </div>
          <div
            className={`it-hero it-hero-${hero} it-grain`}
            style={{ "--grain": grain / 100 } as CSSProperties}
          >
            <div className="it-hero-copy">
              <AvailabilitySample mode={availability} />
              <p className="section-label">{profile.professionalEyebrow}</p>
              <h2 className="hero-name">
                {profile.firstName}
                <span className="text-accent">.</span>
              </h2>
              <p className="body-copy">{profile.professionalIntroduction}</p>
              <div className="hero-actions">
                <ButtonSample mode={button} />
                <a className="it-soft-link" href="#experience">
                  See my experience
                </a>
              </div>
            </div>
            <div className="it-hero-portrait">
              <img
                src={profile.professionalPortrait}
                alt="Matthieu d'Oultremont"
              />
            </div>
          </div>
        </Experiment>
        <Experiment
          id="statement"
          title="Let the sentences breathe"
          description="Compare balanced centering, a narrower left alignment, and one thought per line. Each uses the same words."
        >
          <Choices
            label="Statement layout"
            values={[
              "1 · Centered balance",
              "2 · Left, balanced",
              "3 · Three thoughts",
            ]}
            value={statement}
            onChange={setStatement}
          />
          <div className={`it-statement it-statement-${statement}`}>
            {statement === 2 ? (
              <p>
                {[
                  "Software is my profession.",
                  "Photography trains my eye.",
                  "Flying keeps the ego in check.",
                ].map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            ) : (
              <p>{pageCopy.professionalStatement}</p>
            )}
          </div>
        </Experiment>
        <Experiment
          id="experience"
          title="Experience, with a little more character"
          description="No redundant eyebrow. Compare the introduction, then the company colors and smaller corner logos. The card lines sit on the frame, with a single shared line between cells."
        >
          <div className="it-toolbar">
            <Choices
              label="Introduction"
              values={["1 · Personal note", "2 · Editorial", "3 · Title only"]}
              value={heading}
              onChange={setHeading}
            />
            <Choices
              label="Card treatment"
              values={[
                "1 · Colored light",
                "2 · Colored field",
                "3 · Quiet monochrome",
              ]}
              value={cards}
              onChange={setCards}
            />
          </div>
          <div
            className={`it-experience it-heading-${heading} it-cards-${cards}`}
            style={
              {
                "--grain": grain / 100,
              } as CSSProperties
            }
          >
            <div className="it-experience-intro">
              <h2>{pageCopy.experienceTitle}</h2>
              {heading !== 2 && (
                <p>
                  {heading === 0
                    ? "I care about the details, the people using them, and the people building them."
                    : pageCopy.experienceIntroduction}
                </p>
              )}
            </div>
            <div className="it-company-grid">
              {experiences.map((experience, index) => (
                <article
                  className="it-company it-grain"
                  key={experience.company}
                  style={
                    { "--company-color": brandColors[index] } as CSSProperties
                  }
                >
                  <div className="it-company-top">
                    <p className="experience-period">{experience.period}</p>
                    <div className="it-logo">
                      <img
                        src={`/media/companies/${companyFiles[index]}.jpg`}
                        alt=""
                        width="28"
                        height="28"
                      />
                    </div>
                  </div>
                  <h3>{experience.company}</h3>
                  <p className="experience-summary">{experience.summary}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="it-source-note">
            Logos sourced from the companies’ LinkedIn pages:{" "}
            <a href="https://www.linkedin.com/company/atlassian/">Atlassian</a>,{" "}
            <a href="https://www.linkedin.com/company/cycleapp/">Cycle</a>,{" "}
            <a href="https://www.linkedin.com/company/startkiosk/">Kiosk</a>,{" "}
            <a href="https://www.linkedin.com/company/smovin/">Smovin</a>.
            Colors are exploratory tints, not a brand specification. Logos are
            shown without added grain.
          </p>
        </Experiment>
        <aside className="it-selection">
          <h2>Your combination</h2>
          <p>{summary}</p>
          <button
            className="it-button it-button-0"
            type="button"
            onClick={copySelection}
          >
            Copy choices
          </button>
          <output>
            {copyFailed
              ? "Could not copy. Select and copy the combination text above."
              : copiedSummary === summary
                ? "Choices copied"
                : "Selections stay here until you reload. Nothing is applied to the main pages."}
          </output>
        </aside>
      </main>
    </SiteShell>
  )
}
