import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Matthieu d'Oultremont · Software developer",
      },
      {
        name: "description",
        content:
          "Software developer, photographer and paraglider pilot based in Brussels. Matthieu d'Oultremont is available for his next role.",
      },
      {
        property: "og:title",
        content: "Matthieu d'Oultremont · Software developer",
      },
      {
        property: "og:description",
        content: "Software, photographs, and the view from above.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-full min-w-80 scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="relative min-h-screen bg-[#87918a] bg-[radial-gradient(circle_at_12%_8%,rgba(166,216,193,0.58),transparent_28rem),radial-gradient(circle_at_88%_16%,rgba(165,174,211,0.45),transparent_34rem)] bg-fixed font-sans text-[#111513] antialiased selection:bg-[#c8ff71] selection:text-[#111513]">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
