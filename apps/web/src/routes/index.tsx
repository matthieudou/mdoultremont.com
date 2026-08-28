import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { CopyEmailButton } from "../components/copy-email-button"
import { ExperienceDialog } from "../components/experience-dialog"
import { SiteShell } from "../components/site-shell"
import { experiences, pageCopy, profile } from "../content"
import type { Experience } from "../content"

export const Route = createFileRoute("/")({ component: ProfessionalPage })

function ProfessionalPage() {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null)
  return (
    <SiteShell>
      <main>
        <section className="page-rails professional-hero">
          <div className="section-inner professional-grid">
            <div className="professional-copy">
              {profile.available && (
                <span className="availability">
                  {profile.availabilityLabel}
                </span>
              )}
              <p className="eyebrow">{profile.professionalEyebrow}</p>
              <h1 className="display">
                {profile.firstName}
                <br />
                {profile.lastName}.
              </h1>
              <p className="lede">{profile.professionalIntroduction}</p>
              <div className="hero-actions">
                <CopyEmailButton className="button button--dark">
                  Copy email address <span aria-hidden="true">↗</span>
                </CopyEmailButton>
                <a className="button button--text" href="#experience">
                  See my experience ↓
                </a>
              </div>
            </div>
            <div className="portrait-panel">
              <img
                src={profile.professionalPortrait}
                alt="Matthieu d'Oultremont"
              />
            </div>
          </div>
        </section>
        <section
          className="page-rails statement"
          aria-label="Short introduction"
        >
          <p>{pageCopy.professionalStatement}</p>
        </section>
        <section className="page-rails experience-section" id="experience">
          <div className="section-inner experience-inner">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{pageCopy.experienceEyebrow}</p>
                <h2 className="display">{pageCopy.experienceTitle}</h2>
              </div>
              <p className="lede">{pageCopy.experienceIntroduction}</p>
            </div>
            <div className="experience-list">
              {experiences.map((experience, index) => (
                <button
                  className="experience-card"
                  key={experience.company}
                  type="button"
                  onClick={() => setSelectedExperience(experience)}
                >
                  <span className="experience-index">0{index + 1}</span>
                  <span className="experience-copy">
                    <strong>{experience.company}</strong>
                    <span>{experience.role}</span>
                  </span>
                  <span className="experience-period">{experience.period}</span>
                  <span className="experience-open">Open story ↗</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="page-rails chapter">
          <div className="section-inner chapter-inner">
            <div>
              <p className="eyebrow">{pageCopy.nextChapterEyebrow}</p>
              <h2 className="display">{pageCopy.nextChapterTitle}</h2>
              <p className="lede chapter-copy">
                If it sounds like a fit, drop me a line.
              </p>
            </div>
            <CopyEmailButton
              className="button button--dark"
              ariaLabel="Copy Matthieu's email address"
            >
              Copy email ↗
            </CopyEmailButton>
          </div>
        </section>
      </main>
      <ExperienceDialog
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </SiteShell>
  )
}
