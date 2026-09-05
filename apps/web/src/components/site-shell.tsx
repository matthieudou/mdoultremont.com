import { Toast } from "@base-ui/react/toast"
import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { profile } from "../content"
import { CopyEmailButton } from "./copy-email-button"
import { FaceAnimation } from "./face-animation"

const navigation = [
  { to: "/", label: "Professional" },
  { to: "/photography", label: "Photography" },
] as const

export function SiteShell({
  children,
  contactTitle,
}: {
  children: ReactNode
  contactTitle?: string
}) {
  return (
    <Toast.Provider timeout={3200}>
      <div className="site-shell bg-paper text-ink">
        <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-xl">
          <div className="mx-auto grid min-h-20 w-[calc(100%-2rem)] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 border-x border-line px-4 sm:w-[calc(100%-4rem)] sm:px-6 lg:w-[calc(100%-6rem)] lg:px-8">
            <Link
              className="inline-flex size-11 items-center justify-center rounded-xl"
              to="/"
              aria-label={`${profile.name}, home`}
            >
              <FaceAnimation
                className="block size-10 shrink-0"
                withHover
                withIdle
              />
            </Link>
            <nav
              className="flex items-center justify-center gap-1 px-2 sm:px-4"
              aria-label="Portfolio sections"
            >
              {navigation.map((item) => (
                <Link
                  className="navigation-link"
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "navigation-active" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <CopyEmailButton
              className="contact-button hidden justify-self-end sm:inline-flex"
              ariaLabel="Copy email address"
            >
              Copy email
            </CopyEmailButton>
          </div>
        </header>
        {children}
        <footer className="contact-section textured">
          <div className="site-frame contact-layout">
            <div className="contact-copy">
              <p className="section-label">Say hello</p>
              {contactTitle && (
                <h2 className="section-heading">{contactTitle}</h2>
              )}
              <CopyEmailButton
                className="email-button"
                ariaLabel="Copy email address"
              >
                {profile.email}
              </CopyEmailButton>
              <p className="copy-hint">Click to copy email</p>
            </div>
            <div className="contact-meta">
              <a
                className="text-link"
                href={profile.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <span>{profile.location}</span>
            </div>
          </div>
        </footer>
      </div>
      <Toast.Portal>
        <Toast.Viewport className="fixed right-5 bottom-5 z-200 w-[min(360px,calc(100vw-2.5rem))]" />
      </Toast.Portal>
      <ToastList />
    </Toast.Provider>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()

  return toasts.map((toast) => (
    <Toast.Root
      className="fixed right-5 bottom-5 z-200 w-[min(360px,calc(100vw-2.5rem))] rounded-xl border border-[#555] bg-charcoal p-4 text-paper shadow-2xl"
      key={toast.id}
      toast={toast}
    >
      <Toast.Content className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div>
          <Toast.Title className="m-0 text-sm font-semibold" />
          <Toast.Description className="mt-1 text-xs text-white/60" />
        </div>
        <Toast.Close className="cursor-pointer rounded-full border border-[#555] px-3 py-1.5 text-xs text-paper hover:bg-white/10">
          Close
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}
