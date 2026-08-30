import { Dialog } from "@base-ui/react/dialog"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { SiteShell } from "../components/site-shell"
import { pageCopy, photographs, profile } from "../content"
import type { Photograph } from "../content"
import { CopyEmailButton } from "../components/copy-email-button"

export const Route = createFileRoute("/photography")({
  component: PhotographyPage,
})

function PhotographyPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null)

  return (
    <Dialog.Root
      open={selectedPhoto !== null}
      onOpenChange={(open) => !open && setSelectedPhoto(null)}
    >
      <SiteShell>
        <main>
          <section className="border-b border-line">
            <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1440px] gap-12 border-x border-line sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] lg:grid-cols-[max-content_minmax(19rem,1fr)] lg:items-stretch lg:gap-8">
              <div className="px-4 py-12 sm:px-6 sm:py-16 lg:py-24 lg:pl-8 lg:pr-0">
                <p className="text-[0.7rem] font-bold tracking-[0.12em] text-muted uppercase">
                  {pageCopy.photographyEyebrow}
                </p>
                <h1 className="mt-4 max-w-[9ch] text-[clamp(4rem,9vw,9rem)] leading-[0.9] font-medium tracking-[-0.065em]">
                  {pageCopy.photographyTitle}
                  <span className="text-accent">.</span>
                </h1>
                <p className="mt-8 max-w-xl text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.55] text-muted">
                  {pageCopy.photographyIntroduction}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <CopyEmailButton className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-[#333]">
                    Get in touch
                  </CopyEmailButton>
                  <a
                    className="border-b border-current py-1 text-sm font-semibold transition-colors hover:text-accent-dark"
                    href="#collection"
                  >
                    See the collection
                  </a>
                </div>
              </div>
              <div className="relative self-stretch lg:mr-16">
                <img
                  className="mx-auto block w-full max-w-sm object-contain object-bottom lg:absolute lg:bottom-0 lg:left-1/2 lg:h-[90%] lg:w-auto lg:max-w-full lg:-translate-x-1/2"
                  src={profile.photographyPortrait}
                  alt="Matthieu holding an instant camera"
                />
              </div>
            </div>
          </section>
          <section
            className="border-b border-line"
            aria-label="Photography collection"
            id="collection"
          >
            <div className="mx-auto w-[calc(100%-2rem)] max-w-[1440px] columns-1 gap-6 border-x border-line px-4 py-16 sm:w-[calc(100%-4rem)] sm:px-6 sm:py-20 md:columns-2 lg:w-[calc(100%-6rem)] lg:columns-3 lg:px-8 lg:py-24">
              {photographs.map((photo) => (
                <button
                  className="mb-8 inline-block w-full cursor-zoom-in break-inside-avoid bg-transparent text-left"
                  key={photo.title}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    className="block w-full rounded-xl border border-line transition-transform hover:scale-[1.012]"
                    src={photo.src}
                    alt={`${photo.title}, ${photo.location}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="flex items-start justify-between gap-4 border-b border-line py-3">
                    <strong className="text-sm">{photo.title}</strong>
                    <span className="text-xs text-muted">{photo.location}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </main>
      </SiteShell>
      {selectedPhoto && (
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-100 bg-[#111111d9] backdrop-blur-lg" />
          <Dialog.Viewport className="fixed inset-0 z-101 grid min-h-dvh place-items-center p-4">
            <Dialog.Popup className="relative w-fit max-w-[min(75rem,100%)] outline-none">
              <Dialog.Close
                className="absolute top-4 right-4 cursor-pointer rounded-full border border-[#555] bg-charcoal px-4 py-2 text-xs font-semibold text-paper"
                aria-label="Close photograph"
              >
                Close
              </Dialog.Close>
              <img
                className="block max-h-[calc(100dvh-6rem)] max-w-full rounded-xl"
                src={selectedPhoto.src}
                alt={`${selectedPhoto.title}, ${selectedPhoto.location}`}
              />
              <div className="flex justify-between gap-8 pt-3 text-paper">
                <Dialog.Title>{selectedPhoto.title}</Dialog.Title>
                <Dialog.Description>
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
