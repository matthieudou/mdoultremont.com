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
          <Dialog.Backdrop className="fixed inset-0 z-100 bg-[#111111d9] backdrop-blur-lg" />
          <Dialog.Viewport className="fixed inset-0 z-101 grid min-h-dvh place-items-center p-4">
            <Dialog.Popup className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-auto rounded-2xl border border-[#555] bg-charcoal p-[clamp(2rem,6vw,5rem)] text-paper shadow-2xl outline-none">
              <Dialog.Close
                className="absolute top-4 right-4 cursor-pointer rounded-full border border-[#555] px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/10"
                aria-label="Close dialog"
              >
                Close ×
              </Dialog.Close>
              <p className="text-[0.7rem] font-bold tracking-[0.12em] text-[#aaa8a2] uppercase">
                {experience.period}
              </p>
              <Dialog.Title className="mt-20 text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-medium tracking-[-0.065em]">
                {experience.company}
              </Dialog.Title>
              <p className="my-6 text-lg text-[#aaa8a2]">{experience.role}</p>
              <Dialog.Description className="max-w-lg text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.4]">
                {experience.summary}
              </Dialog.Description>
              <div className="mt-16 border-t border-line-dark pt-4 text-[#aaa8a2]">
                <span className="text-[0.7rem] font-bold tracking-[0.12em] uppercase">
                  Next edit
                </span>
                <p>{experience.prompt}</p>
              </div>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}
