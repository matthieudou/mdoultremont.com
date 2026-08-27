import { createFileRoute, redirect } from "@tanstack/react-router"

const pagesCmsUrl = "https://app.pagescms.org/matthieudou/mdoultremont.com/main"

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    throw redirect({ href: pagesCmsUrl })
  },
})
