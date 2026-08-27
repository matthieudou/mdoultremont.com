import { Toast } from "@base-ui/react/toast"
import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { profile } from "../content"
import { CopyEmailButton } from "./copy-email-button"

const navigation = [
  { to: "/", label: "Professional" },
  { to: "/photography", label: "Photography" },
  { to: "/personal", label: "Personal" },
] as const

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider timeout={3200}>
      <div className="relative isolate mx-auto my-4 min-h-[calc(100vh-2rem)] w-[min(1540px,calc(100%-2rem))] overflow-hidden rounded-[clamp(1.85rem,2.7vw,2.7rem)] border border-white/50 bg-[#f2f2ed] shadow-[0_45px_120px_rgba(18,29,24,0.28),inset_0_1px_rgba(255,255,255,0.7)] max-[760px]:m-0 max-[760px]:min-h-screen max-[760px]:w-full max-[760px]:rounded-none max-[760px]:border-0">
        <header className="absolute top-9 left-1/2 z-20 grid min-h-16 w-[min(760px,calc(100%-5rem))] -translate-x-1/2 grid-cols-[1fr_auto_1fr] items-center rounded-full border border-white/15 bg-[#080c0bc2] py-[0.45rem] pr-[0.55rem] pl-[1.2rem] text-white shadow-[0_18px_50px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-125 max-[760px]:top-4 max-[760px]:min-h-[58px] max-[760px]:w-[calc(100%-2.5rem)] max-[760px]:grid-cols-[1fr_auto] max-[760px]:pl-4">
          <Link
            to="/"
            className="w-fit text-[1.05rem] font-bold tracking-[-0.055em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]"
            aria-label={`${profile.name}, home`}
          >
            MD
            <span className="text-[#c8ff71] [text-shadow:0_0_18px_rgba(200,255,113,0.8)]">
              O
            </span>
          </Link>

          <nav
            className="flex gap-[0.15rem] max-[760px]:fixed max-[760px]:right-3 max-[760px]:bottom-3 max-[760px]:left-3 max-[760px]:z-80 max-[760px]:justify-center max-[760px]:rounded-full max-[760px]:border max-[760px]:border-white/15 max-[760px]:bg-[#080c0bd1] max-[760px]:p-1.5 max-[760px]:shadow-[0_18px_45px_rgba(0,0,0,0.32)] max-[760px]:backdrop-blur-2xl"
            aria-label="Portfolio sections"
          >
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                className="rounded-full px-[0.82rem] py-[0.65rem] text-[0.78rem] font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8ff71] max-[760px]:flex-1 max-[760px]:text-center"
                activeProps={{ className: "bg-white/10 text-white" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <CopyEmailButton
            className="cursor-pointer justify-self-end rounded-full bg-white/95 px-4 py-3 text-[0.78rem] font-semibold text-[#111513] shadow-[0_7px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-px hover:bg-[#c8ff71] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71] max-[760px]:text-[0.72rem]"
            ariaLabel="Copy email address"
          >
            Copy email <span aria-hidden="true">⧉</span>
          </CopyEmailButton>
        </header>

        {children}

        <footer className="flex items-end justify-between gap-12 bg-[#0e1412] bg-[radial-gradient(circle_at_14%_80%,rgba(140,220,255,0.15),transparent_25rem),radial-gradient(circle_at_80%_20%,rgba(200,255,113,0.1),transparent_28rem)] px-[clamp(1.5rem,5vw,5.5rem)] py-[clamp(4rem,8vw,7rem)] text-white max-[760px]:flex-col max-[760px]:items-start max-[760px]:pb-28">
          <div>
            <p className="m-0 text-[0.7rem] font-semibold tracking-[0.13em] uppercase">
              Say hello
            </p>
            <CopyEmailButton
              className="mt-4 inline-block cursor-pointer border-0 border-b border-white/40 bg-transparent p-0 text-[clamp(1.65rem,4.2vw,4.5rem)] leading-none font-normal tracking-[-0.05em] text-inherit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]"
              ariaLabel="Copy email address"
            >
              {profile.email}
            </CopyEmailButton>
          </div>
          <div className="flex gap-6 text-[0.8rem] text-white/45 max-[760px]:flex-col">
            <a
              className="transition-colors hover:text-[#c8ff71] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff71]"
              href={profile.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
            <span>{profile.location}</span>
          </div>
        </footer>
      </div>

      <Toast.Portal>
        <Toast.Viewport className="fixed right-5 bottom-5 z-200 w-[min(360px,calc(100vw-2.5rem))] max-[760px]:right-3 max-[760px]:bottom-22 max-[760px]:w-[calc(100vw-1.5rem)]">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}

function ToastList() {
  const { toasts } = Toast.useToastManager()

  return toasts.map((toast) => (
    <Toast.Root
      className="absolute right-0 bottom-0 w-full origin-bottom [transform:translateY(calc(var(--toast-index)*-0.65rem))_scale(calc(1-var(--toast-index)*0.04))] rounded-[1.1rem] border border-white/20 bg-[#0c1310d1] text-white opacity-100 shadow-[0_22px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl backdrop-saturate-125 transition-[opacity,transform] duration-300 ease-out [--toast-gap:0.7rem] data-[ending-style]:translate-y-[130%] data-[ending-style]:opacity-0 data-[limited]:opacity-0 data-[starting-style]:translate-y-[130%] data-[starting-style]:opacity-0"
      key={toast.id}
      toast={toast}
    >
      <Toast.Content className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 p-3.5">
        <span
          className="grid size-8 place-items-center rounded-full bg-[#c8ff71] text-[0.8rem] font-bold text-[#111513] shadow-[0_0_18px_rgba(200,255,113,0.48)]"
          aria-hidden="true"
        >
          ✓
        </span>
        <div>
          <Toast.Title className="m-0 text-[0.86rem] font-semibold" />
          <Toast.Description className="mt-[0.18rem] mb-0 text-[0.74rem] text-white/55" />
        </div>
        <Toast.Close
          className="cursor-pointer border-0 bg-transparent p-1.5 text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8ff71]"
          aria-label="Dismiss notification"
        >
          ×
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}
