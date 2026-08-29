import { Toast } from "@base-ui/react/toast"
import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { profile } from "../content"
import { CopyEmailButton } from "./copy-email-button"
import { FaceAnimation } from "./face-animation"

const navigation = [
  { to: "/", label: "Professional" },
  { to: "/photography", label: "Photography" },
  { to: "/personal", label: "Personal" },
] as const

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider timeout={3200}>
      <div className="site-shell">
        <header className="site-header">
          <Link
            className="site-mark"
            to="/"
            aria-label={`${profile.name}, home`}
          >
            <FaceAnimation className="site-gaze" withHover withIdle />
          </Link>
          <nav className="site-nav" aria-label="Portfolio sections">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} activeOptions={{ exact: true }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <CopyEmailButton
            className="site-contact"
            ariaLabel="Copy email address"
          >
            Copy email <span aria-hidden="true">↗</span>
          </CopyEmailButton>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <p className="eyebrow">Say hello</p>
              <CopyEmailButton
                className="footer-email"
                ariaLabel="Copy email address"
              >
                {profile.email}
              </CopyEmailButton>
            </div>
            <div className="footer-meta">
              <a href={profile.linkedin} rel="noreferrer" target="_blank">
                LinkedIn ↗
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
      className="fixed right-5 bottom-5 z-200 w-[min(360px,calc(100vw-2.5rem))] rounded-xl border border-[#555] bg-[#171717] p-4 text-[#f8f7f4] shadow-2xl"
      key={toast.id}
      toast={toast}
    >
      <Toast.Content className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div>
          <Toast.Title className="m-0 text-sm font-semibold" />
          <Toast.Description className="mt-1 text-xs text-white/60" />
        </div>
        <Toast.Close
          className="button px-3 py-1.5 text-xs text-[#f8f7f4]"
          aria-label="Dismiss notification"
        >
          Close
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}
