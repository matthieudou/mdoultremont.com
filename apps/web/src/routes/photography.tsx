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
      onOpenChange={(open) => !open && setSelectedPhoto(null)}
    >
      <SiteShell>
        <main>
          <section className="border-b border-line">
            <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1440px] items-end gap-10 border-x border-line px-4 py-16 sm:w-[calc(100%-4rem)] sm:px-6 sm:py-20 lg:w-[calc(100%-6rem)] lg:grid-cols-[1fr_minmax(17rem,0.5fr)] lg:gap-24 lg:px-8 lg:py-24">
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.12em] text-muted uppercase">
                  {pageCopy.photographyEyebrow}
                </p>
                <h1 className="mt-4 max-w-[9ch] text-[clamp(4rem,9vw,9rem)] leading-[0.9] font-medium tracking-[-0.065em]">
                  {pageCopy.photographyTitle}
                </h1>
                <p className="mt-8 max-w-xl text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.55] text-muted">
                  {pageCopy.photographyIntroduction}
                </p>
              </div>
              <img
                className="mx-auto block w-40 lg:mr-0 lg:w-full lg:max-w-80"
                src={profile.photographyPortrait}
                alt="Matthieu holding an instant camera"
              />
            </div>
          </section>
          <section
            className="border-b border-line"
            aria-label="Photography collection"
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
