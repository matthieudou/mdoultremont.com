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

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider timeout={3200}>
      <div className="overflow-hidden bg-paper text-ink">
        <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-xl">
          <div className="mx-auto grid min-h-20 w-[calc(100%-2rem)] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 border-x border-line px-4 sm:w-[calc(100%-4rem)] sm:px-6 lg:w-[calc(100%-6rem)] lg:px-8">
            <Link
              className="inline-flex size-11 items-center justify-center rounded-xl outline-none"
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
                  className="rounded-full px-2 py-2 text-xs font-semibold text-muted transition-colors hover:bg-[#eceae5] hover:text-ink sm:px-3"
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "bg-[#eceae5] text-ink" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <CopyEmailButton
              className="hidden min-h-11 justify-self-end rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-[#333] sm:inline-flex sm:items-center"
              ariaLabel="Copy email address"
            >
              Get in touch
            </CopyEmailButton>
          </div>
        </header>
        {children}
        <footer className="bg-charcoal text-paper">
          <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1440px] gap-12 border-x border-line-dark px-4 py-16 sm:w-[calc(100%-4rem)] sm:px-6 sm:py-20 lg:w-[calc(100%-6rem)] lg:grid-cols-[1fr_auto] lg:px-8 lg:py-24">
            <div>
              <p className="m-0 text-[0.7rem] font-bold tracking-[0.12em] text-[#aaa8a2] uppercase">
                Say hello
              </p>
              <CopyEmailButton
                className="mt-4 block cursor-pointer bg-transparent p-0 text-left text-[clamp(1.9rem,4vw,4.5rem)] leading-none tracking-[-0.055em] text-inherit"
                ariaLabel="Copy email address"
              >
                {profile.email}
              </CopyEmailButton>
            </div>
            <div className="flex flex-col gap-3 self-end text-sm text-[#aaa8a2] lg:flex-row lg:gap-6">
              <a
                className="hover:text-accent"
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
