import { Dialog } from "@base-ui/react/dialog"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { SiteShell } from "../components/site-shell"
import { pageCopy, photographs, profile } from "../content"
import type { Photograph } from "../content"

export const Route = createFileRoute("/photography")({
  component: PhotographyPage,
})

function PhotographyPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null)

  return (
    <Dialog.Root
      open={selectedPhoto !== null}
      onOpenChange={(open) => {
        if (!open) setSelectedPhoto(null)
      }}
    >
      <SiteShell>
        <main>
          <section className="relative block min-h-[610px] overflow-hidden bg-[#111714] bg-[radial-gradient(circle_at_78%_28%,rgba(140,220,255,0.22),transparent_28rem),radial-gradient(circle_at_18%_80%,rgba(255,139,97,0.16),transparent_25rem)] pt-[clamp(10rem,16vw,14rem)] pr-[max(52vw,34rem)] pb-[clamp(4rem,7vw,7rem)] pl-[clamp(1.5rem,5vw,5.5rem)] text-white after:absolute after:top-32 after:right-[7%] after:size-[22rem] after:rounded-full after:border after:border-white/15 after:shadow-[0_0_70px_rgba(140,220,255,0.12),inset_0_0_70px_rgba(181,173,255,0.06)] after:content-[''] max-[1050px]:pr-[46vw] max-[760px]:min-h-[540px] max-[760px]:pt-36 max-[760px]:pr-6 max-[760px]:before:absolute max-[760px]:before:inset-0 max-[760px]:before:z-2 max-[760px]:before:bg-[linear-gradient(90deg,rgba(17,23,20,0.86),rgba(17,23,20,0.1))] max-[760px]:before:content-['']">
            <div className="relative z-3 flex h-full max-w-[42rem] flex-col justify-end max-[760px]:max-w-md">
              <p className="m-0 text-[0.7rem] font-semibold tracking-[0.13em] uppercase">
                {pageCopy.photographyEyebrow}
              </p>
              <h1 className="my-0 max-w-[9ch] text-[clamp(4rem,8vw,9rem)] leading-[0.8] font-[470] tracking-[-0.075em]">
                {pageCopy.photographyTitle}
              </h1>
              <p className="mt-6 mb-0 max-w-[30rem] text-[0.96rem] leading-[1.55] text-white/60">
                {pageCopy.photographyIntroduction}
              </p>
            </div>
            <img
              className="absolute right-[clamp(-5rem,-3vw,-1rem)] bottom-[-1px] z-1 max-h-[94%] w-[min(61vw,920px)] object-contain object-right-bottom drop-shadow-[-30px_24px_55px_rgba(0,0,0,0.32)] max-[1050px]:-right-40 max-[1050px]:w-[72vw] max-[760px]:-right-48 max-[760px]:max-h-[86%] max-[760px]:w-[145vw]"
              src={profile.photographyPortrait}
              alt="Matthieu holding an instant camera"
            />
          </section>

          <section
            className="columns-3 gap-4 bg-[#e8ebe5] bg-[radial-gradient(circle_at_5%_40%,rgba(140,220,255,0.22),transparent_28rem)] px-[clamp(1.5rem,5vw,5.5rem)] pt-[clamp(3rem,5vw,5rem)] pb-[clamp(5rem,8vw,8rem)] max-[1050px]:columns-2 max-[760px]:columns-1"
            aria-label="Photography collection"
          >
            {photographs.map((photo) => (
              <button
                className="group relative mb-4 inline-block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-[clamp(1.35rem,2.2vw,2.2rem)] border border-white/70 bg-[#111513] p-0 shadow-[0_24px_50px_rgba(28,42,36,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]"
                type="button"
                key={photo.title}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.75,0.2,1)] group-hover:scale-[1.04]"
                  src={photo.src}
                  alt={`${photo.title}, ${photo.location}`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-4 rounded-[1.2rem] border border-white/20 bg-[#0b12107a] p-4 text-left text-white shadow-[0_14px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-125">
                  <strong className="font-medium">{photo.title}</strong>
                  <span className="text-[0.72rem] text-white/60">
                    {photo.location}
                  </span>
                </span>
              </button>
            ))}
          </section>
        </main>
      </SiteShell>

      {selectedPhoto && (
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-100 bg-[#080c0bb8] opacity-100 backdrop-blur-2xl backdrop-saturate-110 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Viewport className="fixed inset-0 z-101 grid min-h-dvh place-items-center p-4">
            <Dialog.Popup className="relative flex max-h-[calc(100dvh-2rem)] w-fit max-w-[min(1200px,100%)] flex-col transition duration-200 outline-none data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0">
              <Dialog.Close
                className="absolute top-3 right-3 z-2 cursor-pointer rounded-full border border-white/20 bg-white/85 px-3.5 py-3 backdrop-blur-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]"
                aria-label="Close photograph"
              >
                Close ×
              </Dialog.Close>
              <img
                className="max-h-[calc(100dvh-6rem)] w-auto rounded-[1.2rem] border border-white/20 object-contain shadow-[0_35px_100px_rgba(0,0,0,0.45)]"
                src={selectedPhoto.src}
                alt={`${selectedPhoto.title}, ${selectedPhoto.location}`}
              />
              <div className="flex justify-between gap-8 px-1 pt-3 text-white">
                <Dialog.Title className="m-0 text-base">
                  {selectedPhoto.title}
                </Dialog.Title>
                <Dialog.Description className="m-0 text-white/55">
                  {selectedPhoto.location}
                </Dialog.Description>
              </div>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}
