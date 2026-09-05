import { createFileRoute } from "@tanstack/react-router"
import { CopyEmailButton } from "../components/copy-email-button"
import { SiteShell } from "../components/site-shell"
import { experiences, pageCopy, profile } from "../content"

export const Route = createFileRoute("/")({ component: ProfessionalPage })

const companyLogos: Record<string, string> = {
  Atlassian: "atlassian",
  Cycle: "cycle",
  Kiosk: "kiosk",
  Smovin: "smovin",
}

function ProfessionalPage() {
  return (
    <SiteShell contactTitle={pageCopy.nextChapterTitle}>
      <main>
        <section className="professional-hero section-rule">
          <div className="site-frame editorial-grid hero-surface">
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
                <a className="soft-link" href="#experience">
                  See my experience
                </a>
              </div>
            </div>
            <div className="portrait-stage">
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
                <h2 className="section-heading">{pageCopy.experienceTitle}</h2>
              </div>
              <p className="body-copy">{pageCopy.experienceIntroduction}</p>
            </div>
            <div className="experience-grid">
              {experiences.map((experience) => (
                <article className="experience-cell" key={experience.company}>
                  <div className="experience-top">
                    <p className="experience-period">{experience.period}</p>
                    {companyLogos[experience.company] && (
                      <img
                        className="company-logo"
                        src={`/media/companies/${companyLogos[experience.company]}.jpg`}
                        alt=""
                        width="28"
                        height="28"
                      />
                    )}
                  </div>
                  <h3>{experience.company}</h3>
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
