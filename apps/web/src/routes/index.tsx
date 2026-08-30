import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { CopyEmailButton } from "../components/copy-email-button"
import { ExperienceDialog } from "../components/experience-dialog"
import { SiteShell } from "../components/site-shell"
import { experiences, pageCopy, profile } from "../content"
import type { Experience } from "../content"

export const Route = createFileRoute("/")({ component: ProfessionalPage })

const eyebrowClass =
  "m-0 text-[0.7rem] font-bold tracking-[0.12em] text-muted uppercase"
const displayClass = "leading-[0.9] font-medium tracking-[-0.065em]"

function ProfessionalPage() {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null)

  return (
    <SiteShell>
      <main>
        <section className="border-b border-line">
          <div className="mx-auto grid w-[calc(100%-2rem)] max-w-360 gap-12 border-x border-line sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] lg:grid-cols-2 lg:items-stretch lg:gap-8">
            <div className="px-4 py-12 sm:px-6 sm:py-16 lg:py-24 lg:pl-8 lg:pr-0">
              {profile.available && (
                <span className="mb-10 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.08em] text-accent-dark uppercase">
                  <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping motion-safe:[animation-duration:2.4s]" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_2px_rgb(16_185_129/0.45)]" />
                  </span>
                  {profile.availabilityLabel}
                </span>
              )}
              <p className={eyebrowClass}>{profile.professionalEyebrow}</p>
              <h1
                className={`${displayClass} mt-4 max-w-[11ch] text-[clamp(4rem,9vw,9rem)]`}
              >
                {profile.firstName}
                <span className="text-accent">.</span>
              </h1>
              <p className="mt-8 max-w-136 text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.55] text-muted">
                {profile.professionalIntroduction}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <CopyEmailButton className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-[#333]">
                  Get in touch
                </CopyEmailButton>
                <a
                  className="border-b border-current py-1 text-sm font-semibold transition-colors hover:text-accent-dark"
                  href="#experience"
                >
                  See my experience
                </a>
              </div>
            </div>
            <div className="relative self-stretch lg:mr-16">
              <img
                className="block h-auto w-full object-contain object-bottom lg:absolute lg:bottom-0 lg:left-1/2 lg:h-[90%] lg:w-auto lg:max-w-full lg:-translate-x-1/2"
                src={profile.professionalPortrait}
                alt="Matthieu d'Oultremont"
              />
            </div>
          </div>
        </section>

        <section
          className="border-b border-line"
          aria-label="Short introduction"
        >
          <div className="mx-auto w-[calc(100%-2rem)] max-w-360 border-x border-line px-4 py-16 sm:w-[calc(100%-4rem)] sm:px-6 sm:py-20 lg:w-[calc(100%-6rem)] lg:px-8 lg:py-24">
            <p
              className={`${displayClass} mx-auto max-w-[18ch] text-center text-[clamp(2.8rem,6.2vw,7.2rem)]`}
            >
              {pageCopy.professionalStatement}
            </p>
          </div>
        </section>

        <section
          className="border-b border-line-dark bg-charcoal text-paper"
          id="experience"
        >
          <div className="mx-auto w-[calc(100%-2rem)] max-w-360 border-x border-line-dark py-16 sm:w-[calc(100%-4rem)] sm:py-20 lg:w-[calc(100%-6rem)] lg:py-24">
            <div className="grid items-end gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
              <div>
                <p className={`${eyebrowClass} text-[#aaa8a2]`}>
                  {pageCopy.experienceEyebrow}
                </p>
                <h2
                  className={`${displayClass} mt-4 max-w-[12ch] text-[clamp(2.9rem,5.4vw,6.25rem)]`}
                >
                  {pageCopy.experienceTitle}
                </h2>
              </div>
              <p className="max-w-xl text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.55] text-[#aaa8a2]">
                {pageCopy.experienceIntroduction}
              </p>
            </div>
            <div className="grid grid-cols-1 border-t border-line-dark sm:grid-cols-2 xl:grid-cols-4">
              {experiences.map((experience, index) => (
                <button
                  className={[
                    "grid min-h-48 w-full cursor-pointer grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-5 border-b border-line-dark bg-transparent p-5 text-left text-inherit transition-colors hover:bg-[#242424] sm:min-h-56 sm:p-6 xl:min-h-52",
                    index % 2 === 0 ? "sm:border-r" : "",
                    index < experiences.length - 1 ? "xl:border-r" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={experience.company}
                  type="button"
                  onClick={() => setSelectedExperience(experience)}
                >
                  <span className="text-[0.68rem] font-bold tracking-widest text-[#aaa8a2] uppercase">
                    0{index + 1}
                  </span>
                  <span className="text-right text-[0.68rem] font-bold tracking-widest text-[#aaa8a2] uppercase">
                    {experience.period}
                  </span>
                  <span className="col-span-2 self-end">
                    <strong className="block text-[clamp(1.75rem,2.6vw,3rem)] leading-[0.9] font-medium tracking-[-0.06em]">
                      {experience.company}
                    </strong>
                    <span className="mt-2 block text-sm text-[#aaa8a2]">
                      {experience.role}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto w-[calc(100%-2rem)] max-w-360 border-x border-line py-16 sm:w-[calc(100%-4rem)] sm:py-20 lg:w-[calc(100%-6rem)] lg:py-24">
            <div className="grid items-end gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_auto] lg:px-8">
              <div>
                <p className={eyebrowClass}>{pageCopy.nextChapterEyebrow}</p>
                <h2
                  className={`${displayClass} mt-4 max-w-[12ch] text-[clamp(3rem,6vw,7rem)]`}
                >
                  {pageCopy.nextChapterTitle}
                </h2>
                <p className="mt-6 max-w-120 text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.55] text-muted">
                  If it sounds like a fit, drop me a line.
                </p>
              </div>
              <CopyEmailButton className="inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-[#333]">
                Get in touch
              </CopyEmailButton>
            </div>
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
