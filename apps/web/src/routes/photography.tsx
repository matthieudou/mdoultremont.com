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
          <section className="page-rails page-hero">
            <div className="section-inner page-hero-grid">
              <div>
                <p className="eyebrow">{pageCopy.photographyEyebrow}</p>
                <h1 className="display">{pageCopy.photographyTitle}</h1>
                <p className="lede mt-8 max-w-xl">
                  {pageCopy.photographyIntroduction}
                </p>
              </div>
              <div className="hero-mark">
                <img
                  src={profile.photographyPortrait}
                  alt="Matthieu holding an instant camera"
                />
              </div>
            </div>
          </section>
          <section
            className="page-rails gallery"
            aria-label="Photography collection"
          >
            <div className="section-inner gallery-grid">
              {photographs.map((photo) => (
                <button
                  className="photo-item"
                  key={photo.title}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.src}
                    alt={`${photo.title}, ${photo.location}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="photo-caption">
                    <strong>{photo.title}</strong>
                    <span>{photo.location}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </main>
      </SiteShell>
      {selectedPhoto && (
        <Dialog.Portal>
          <Dialog.Backdrop className="dialog-backdrop" />
          <Dialog.Viewport className="dialog-viewport">
            <Dialog.Popup className="dialog-panel photo-dialog">
              <Dialog.Close
                className="button dialog-close"
                aria-label="Close photograph"
              >
                Close ×
              </Dialog.Close>
              <img
                src={selectedPhoto.src}
                alt={`${selectedPhoto.title}, ${selectedPhoto.location}`}
              />
              <div className="photo-dialog-copy">
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
