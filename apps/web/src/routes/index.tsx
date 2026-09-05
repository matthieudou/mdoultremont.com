import { createFileRoute } from "@tanstack/react-router"
import { CopyEmailButton } from "../components/copy-email-button"
import { SiteShell } from "../components/site-shell"
import { experiences, pageCopy, profile } from "../content"

export const Route = createFileRoute("/")({ component: ProfessionalPage })

function ProfessionalPage() {
  return (
    <SiteShell contactTitle={pageCopy.nextChapterTitle}>
      <main>
        <section className="professional-hero section-rule">
          <div className="site-frame editorial-grid">
            <div className="hero-copy">
              {profile.available && (
                <span className="availability">
                  <span aria-hidden="true" />
                  {profile.availabilityLabel}
                </span>
              )}
              <p className="section-label">{profile.professionalEyebrow}</p>
              <h1 className="hero-name">
                {profile.firstName}
                <span className="text-accent">.</span>
              </h1>
              <p className="body-copy hero-introduction">
                {profile.professionalIntroduction}
              </p>
              <div className="hero-actions">
                <CopyEmailButton className="contact-button">
                  Copy email
                </CopyEmailButton>
                <a className="text-link" href="#experience">
                  See my experience
                </a>
              </div>
            </div>
            <div className="portrait-stage textured">
              <img
                src={profile.professionalPortrait}
                alt="Matthieu d'Oultremont"
              />
            </div>
          </div>
        </section>
        <section className="section-rule" aria-label="Short introduction">
          <div className="site-frame statement-grid">
            <p className="personal-statement">
              {pageCopy.professionalStatement}
            </p>
          </div>
        </section>
        <section className="experience-section textured" id="experience">
          <div className="site-frame">
            <div className="experience-heading editorial-grid">
              <div>
                <p className="section-label">{pageCopy.experienceEyebrow}</p>
                <h2 className="section-heading">{pageCopy.experienceTitle}</h2>
              </div>
              <p className="body-copy">{pageCopy.experienceIntroduction}</p>
            </div>
            <div className="experience-grid">
              {experiences.map((experience) => (
                <article className="experience-cell" key={experience.company}>
                  <p className="experience-period">{experience.period}</p>
                  <h3>{experience.company}</h3>
                  <p className="experience-role">{experience.role}</p>
                  <p className="experience-summary">{experience.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}
