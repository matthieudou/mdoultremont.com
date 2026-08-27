import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import type { CSSProperties } from "react"
import { ExperienceDialog } from "../components/experience-dialog"
import { CopyEmailButton } from "../components/copy-email-button"
import { SiteShell } from "../components/site-shell"
import { experiences, pageCopy, profile } from "../content"
import type { Experience } from "../content"

export const Route = createFileRoute("/")({ component: ProfessionalPage })

function ProfessionalPage() {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null)
  const heroStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(10, 16, 14, 0.9) 0%, rgba(10, 16, 14, 0.58) 48%, rgba(10, 16, 14, 0.18) 100%), linear-gradient(0deg, rgba(8, 12, 11, 0.72), transparent 45%), url("${pageCopy.professionalHeroImage}")`,
  } as CSSProperties
  const nextChapterStyle = {
    backgroundImage: `linear-gradient(100deg, rgba(7, 14, 13, 0.75), rgba(7, 14, 13, 0.1)), url("${pageCopy.nextChapterImage}")`,
  } as CSSProperties

  return (
    <SiteShell>
      <main>
        <section
          className="relative m-5 grid min-h-[min(900px,calc(100vh-4rem))] grid-cols-[minmax(0,1.08fr)_minmax(390px,0.72fr)] gap-[clamp(2rem,5vw,5.5rem)] overflow-hidden rounded-[clamp(1.35rem,2.2vw,2.2rem)] bg-cover bg-[position:center_48%] px-[clamp(1.5rem,5vw,5.5rem)] pt-[clamp(8rem,13vw,12rem)] pb-[clamp(3rem,6vw,5.5rem)] text-white shadow-[0_34px_90px_rgba(23,35,30,0.32),inset_0_1px_rgba(255,255,255,0.18)] max-[1050px]:min-h-0 max-[1050px]:grid-cols-1 max-[760px]:m-3 max-[760px]:min-h-[900px] max-[760px]:bg-[position:center] max-[760px]:pt-32"
          style={heroStyle}
        >
          <div
            className="pointer-events-none absolute top-[16%] right-[7%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(126,219,190,0.26),transparent_67%)] blur-xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-[38%] bottom-[-26%] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,157,111,0.22),transparent_68%)] blur-xl"
            aria-hidden="true"
          />

          <div className="relative z-2 flex flex-col items-start justify-end">
            {profile.available && (
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0b131061] px-3.5 py-2.5 text-[0.72rem] font-semibold tracking-[0.07em] uppercase shadow-[0_12px_35px_rgba(0,0,0,0.16),inset_0_1px_rgba(255,255,255,0.12)] backdrop-blur-lg">
                <span className="size-2 rounded-full bg-[#c8ff71] shadow-[0_0_18px_rgba(200,255,113,0.95)]" />{" "}
                {profile.availabilityLabel}
              </div>
            )}
            <p className="m-0 text-[0.7rem] font-semibold tracking-[0.13em] uppercase">
              {profile.professionalEyebrow}
            </p>
            <h1 className="my-[1.2rem] max-w-[10ch] text-[clamp(4rem,7.6vw,8.5rem)] leading-[0.8] font-[470] tracking-[-0.075em] max-[760px]:text-[clamp(3.5rem,17vw,6rem)]">
              {profile.firstName}
              <br />
              {profile.lastName}
              <span className="text-[#c8ff71] [text-shadow:0_0_30px_rgba(200,255,113,0.78)]">
                .
              </span>
            </h1>
            <p className="m-0 max-w-[34rem] text-[clamp(1.05rem,1.6vw,1.35rem)] leading-[1.45] text-white/70">
              {profile.professionalIntroduction}
            </p>
            <div className="mt-9 flex items-center gap-6 max-[760px]:flex-col max-[760px]:items-start">
              <CopyEmailButton className="inline-flex cursor-pointer items-center gap-6 rounded-full border border-white/20 bg-white/95 px-5 py-4 text-[0.86rem] font-semibold text-[#111513] transition hover:-translate-y-0.5 hover:bg-[#c8ff71] hover:shadow-[0_16px_34px_rgba(0,0,0,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]">
                Copy email address <span aria-hidden="true">⧉</span>
              </CopyEmailButton>
              <a
                className="border-b border-white/50 pb-[0.18rem] text-[0.86rem] text-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]"
                href="#experience"
              >
                See my experience ↓
              </a>
            </div>
          </div>

          <div
            className="relative z-2 grid min-h-[500px] gap-3 self-end [grid-template:1fr_0.68fr/1fr_0.72fr] max-[1050px]:min-h-[580px] max-[760px]:min-h-[520px] max-[760px]:[grid-template:1.3fr_0.7fr/1fr_1fr]"
            aria-label="Profile highlights"
          >
            <div className="relative row-span-2 overflow-hidden rounded-[clamp(1.35rem,2.2vw,2.2rem)] border border-white/20 bg-[radial-gradient(circle_at_50%_30%,rgba(140,220,255,0.26),transparent_42%),linear-gradient(150deg,rgba(255,255,255,0.16),rgba(10,16,14,0.5))] shadow-[0_24px_50px_rgba(0,0,0,0.2),inset_0_1px_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-125 max-[760px]:col-span-2 max-[760px]:row-span-1">
              <img
                className="absolute inset-0 size-full object-contain object-bottom drop-shadow-[0_24px_32px_rgba(0,0,0,0.28)]"
                src={profile.professionalPortrait}
                alt="Matthieu d'Oultremont"
              />
              <div className="absolute right-0 bottom-0 left-0 z-2 h-[42%] bg-linear-to-b from-transparent to-[#040a08b8]" />
              <p className="absolute right-5 bottom-5 left-5 z-3 m-0 text-center text-[0.72rem] text-white/70">
                Software developer · Brussels
              </p>
            </div>
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[clamp(1.35rem,2.2vw,2.2rem)] border border-white/20 bg-[linear-gradient(145deg,rgba(200,255,113,0.24),rgba(11,19,16,0.3))] p-5 shadow-[0_24px_50px_rgba(0,0,0,0.2),inset_0_1px_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-125">
              <strong className="text-[clamp(4.8rem,7vw,7rem)] leading-[0.8] font-normal tracking-[-0.08em] text-white [text-shadow:0_0_38px_rgba(200,255,113,0.26)]">
                4
              </strong>
              <span className="text-[0.68rem] tracking-[0.1em] text-white/60 uppercase">
                product companies
              </span>
            </div>
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[clamp(1.35rem,2.2vw,2.2rem)] border border-white/20 bg-[linear-gradient(145deg,rgba(140,220,255,0.22),rgba(11,19,16,0.36))] p-5 shadow-[0_24px_50px_rgba(0,0,0,0.2),inset_0_1px_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-125">
              <span className="text-[0.68rem] tracking-[0.1em] text-white/60 uppercase">
                Currently
              </span>
              <strong className="max-w-[13ch] text-[clamp(1.2rem,2vw,2rem)] leading-[1.08] font-normal">
                Open to the next good problem.
              </strong>
              <div
                className="absolute top-3.5 right-4 text-[1.7rem] text-[#8cdcff] [text-shadow:0_0_22px_rgba(140,220,255,0.9)]"
                aria-hidden="true"
              >
                ✦
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-[#f2f2ed] px-[clamp(1.5rem,8vw,9rem)] py-[clamp(5rem,10vw,10rem)]"
          aria-label="Short introduction"
        >
          <p className="mx-auto max-w-[1220px] text-center text-[clamp(2.7rem,5.3vw,6.4rem)] leading-none font-[470] tracking-[-0.055em]">
            {pageCopy.professionalStatement}
          </p>
        </section>

        <section
          className="relative overflow-hidden bg-[#111714] bg-[radial-gradient(circle_at_12%_20%,rgba(140,220,255,0.14),transparent_24rem),radial-gradient(circle_at_88%_80%,rgba(181,173,255,0.14),transparent_27rem)] px-[clamp(1.5rem,5vw,5.5rem)] py-[clamp(5rem,8vw,8rem)] text-white"
          id="experience"
        >
          <div className="mb-14 grid grid-cols-[1.3fr_0.7fr] items-end gap-8 max-[760px]:grid-cols-1">
            <div>
              <p className="m-0 text-[0.7rem] font-semibold tracking-[0.13em] uppercase">
                {pageCopy.experienceEyebrow}
              </p>
              <h2 className="mt-4 mb-0 max-w-[15ch] text-[clamp(2.6rem,5vw,5.5rem)] leading-[0.94] font-[470] tracking-[-0.055em]">
                {pageCopy.experienceTitle}
              </h2>
            </div>
            <p className="m-0 max-w-[29rem] text-[0.96rem] leading-[1.55] text-white/55">
              {pageCopy.experienceIntroduction}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 max-[1050px]:grid-cols-2 max-[760px]:grid-cols-1">
            {experiences.map((experience, index) => (
              <button
                className="group relative flex min-h-[390px] cursor-pointer flex-col overflow-hidden rounded-[clamp(1.35rem,2.2vw,2.2rem)] border border-white/10 bg-white/5 p-[1.4rem] text-left text-white shadow-[0_24px_55px_rgba(0,0,0,0.18),inset_0_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl transition duration-200 hover:-translate-y-2 hover:border-white/25 hover:bg-white/10 hover:shadow-[0_34px_70px_rgba(0,0,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71] max-[760px]:min-h-[300px]"
                key={experience.company}
                type="button"
                onClick={() => setSelectedExperience(experience)}
              >
                <span
                  className={`pointer-events-none absolute size-56 -translate-x-[45%] -translate-y-[55%] rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-40 ${experienceGlow[experience.accent]}`}
                />
                <span className="relative z-1 text-[0.68rem] tracking-[0.1em] text-white/45 uppercase">
                  0{index + 1}
                </span>
                <span className="absolute top-[1.4rem] right-[1.4rem] z-1 text-[0.68rem] tracking-[0.1em] text-white/45 uppercase">
                  {experience.period}
                </span>
                <span className="relative z-1 mt-auto text-[clamp(2rem,3.1vw,3.5rem)] leading-[0.92] font-[470] tracking-[-0.055em]">
                  {experience.company}
                </span>
                <span className="relative z-1 mt-3 text-[0.86rem] text-white/55">
                  {experience.role}
                </span>
                <span className="relative z-1 mt-10 text-[0.7rem] font-semibold tracking-[0.06em] text-white/70 uppercase">
                  Open story ↗
                </span>
              </button>
            ))}
          </div>
        </section>

        <section
          className="relative m-5 min-h-[520px] overflow-hidden rounded-[clamp(1.35rem,2.2vw,2.2rem)] bg-cover bg-[position:center_54%] p-[clamp(2rem,5vw,4.5rem)] text-white shadow-[0_28px_70px_rgba(19,39,33,0.24)] max-[760px]:m-3 max-[760px]:min-h-[600px]"
          style={nextChapterStyle}
        >
          <div className="absolute -top-[30%] -right-[8%] size-[30rem] rounded-full bg-[#8cdcff3b] blur-[55px]" />
          <p className="relative z-1 m-0 text-[0.7rem] font-semibold tracking-[0.13em] uppercase">
            {pageCopy.nextChapterEyebrow}
          </p>
          <div className="relative z-1 flex min-h-[350px] items-end justify-between gap-8 max-[760px]:flex-col max-[760px]:items-start">
            <h2 className="mt-4 mb-0 max-w-[15ch] text-[clamp(2.6rem,5vw,5.5rem)] leading-[0.94] font-[470] tracking-[-0.055em] [text-shadow:0_4px_32px_rgba(0,0,0,0.28)]">
              {pageCopy.nextChapterTitle}
            </h2>
            <CopyEmailButton
              className="grid aspect-square w-[clamp(5rem,8vw,8rem)] shrink-0 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/90 text-[2.3rem] text-[#111513] shadow-[0_18px_38px_rgba(0,0,0,0.22)] backdrop-blur-lg transition hover:scale-105 hover:rotate-12 hover:bg-[#c8ff71] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]"
              ariaLabel="Copy Matthieu's email address"
            >
              ⧉
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

const experienceGlow = {
  blue: "bg-[#8cdcff]",
  lilac: "bg-[#b5adff]",
  orange: "bg-[#ff8b61]",
  lime: "bg-[#c8ff71]",
} as const
