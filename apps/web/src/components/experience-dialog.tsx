import { Dialog } from "@base-ui/react/dialog"
import type { Experience } from "../content"

type ExperienceDialogProps = {
  experience: Experience | null
  onClose: () => void
}

export function ExperienceDialog({
  experience,
  onClose,
}: ExperienceDialogProps) {
  return (
    <Dialog.Root
      open={experience !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      {experience && (
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-100 bg-[#080c0bb8] backdrop-blur-2xl backdrop-saturate-110 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Viewport className="fixed inset-0 z-101 grid min-h-dvh place-items-center p-4">
            <Dialog.Popup
              className={`relative max-h-[calc(100vh-2rem)] w-[min(720px,100%)] overflow-auto rounded-[clamp(1.35rem,2.2vw,2.2rem)] border border-white/20 p-[clamp(2rem,6vw,5rem)] text-white shadow-[0_35px_100px_rgba(0,0,0,0.45),inset_0_1px_rgba(255,255,255,0.16)] backdrop-blur-3xl transition duration-200 outline-none data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 ${dialogBackgrounds[experience.accent]}`}
            >
              <Dialog.Close
                className="absolute top-5 right-5 cursor-pointer rounded-full border border-white/15 bg-white/10 px-3.5 py-2.5 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]"
                aria-label="Close dialog"
              >
                Close ×
              </Dialog.Close>
              <p className="m-0 text-[0.7rem] font-semibold tracking-[0.13em] uppercase">
                {experience.period}
              </p>
              <Dialog.Title className="mt-16 mb-0 text-[clamp(4rem,9vw,7.5rem)] leading-[0.8] font-normal tracking-[-0.075em]">
                {experience.company}
              </Dialog.Title>
              <p className="mt-6 mb-14 text-[1.15rem] text-white/60">
                {experience.role}
              </p>
              <Dialog.Description className="max-w-[30rem] text-[1.45rem] leading-[1.32]">
                {experience.summary}
              </Dialog.Description>
              <div className="mt-16 border-t border-white/15 pt-4">
                <span className="text-[0.68rem] font-semibold tracking-[0.1em] text-white/50 uppercase">
                  Next edit
                </span>
                <p className="mt-2 mb-0">{experience.prompt}</p>
              </div>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}

const dialogBackgrounds = {
  blue: "bg-[radial-gradient(circle_at_90%_10%,rgba(140,220,255,0.2),transparent_25rem),rgba(20,28,25,0.82)]",
  lilac:
    "bg-[radial-gradient(circle_at_90%_10%,rgba(181,173,255,0.28),transparent_25rem),rgba(20,28,25,0.82)]",
  orange:
    "bg-[radial-gradient(circle_at_90%_10%,rgba(255,139,97,0.27),transparent_25rem),rgba(20,28,25,0.82)]",
  lime: "bg-[radial-gradient(circle_at_90%_10%,rgba(200,255,113,0.23),transparent_25rem),rgba(20,28,25,0.82)]",
} as const
