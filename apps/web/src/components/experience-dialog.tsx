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
          <Dialog.Backdrop className="dialog-backdrop" />
          <Dialog.Viewport className="dialog-viewport">
            <Dialog.Popup className="dialog-panel">
              <Dialog.Close
                className="button dialog-close"
                aria-label="Close dialog"
              >
                Close ×
              </Dialog.Close>
              <p className="eyebrow">{experience.period}</p>
              <Dialog.Title className="display">
                {experience.company}
              </Dialog.Title>
              <p className="dialog-role">{experience.role}</p>
              <Dialog.Description className="dialog-summary">
                {experience.summary}
              </Dialog.Description>
              <div className="dialog-next">
                <span className="eyebrow">Next edit</span>
                <p>{experience.prompt}</p>
              </div>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}
