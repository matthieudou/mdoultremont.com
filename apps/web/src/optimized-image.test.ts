import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, test } from "vitest"
import { ResponsiveImage } from "./components/responsive-image"

const image = { width: 1200, height: 800, version: "abc123" }

describe("responsive portfolio images", () => {
  test("serves a versioned responsive portrait without changing its CMS path", () => {
    const html = renderToStaticMarkup(
      createElement(ResponsiveImage, {
        src: "/media/profile/portrait.png",
        image,
        optimized: true,
        alt: "Matthieu",
        sizes: "(min-width: 1024px) 50vw, 100vw",
      })
    )
    expect(html).toContain('width="1200" height="800"')
    expect(html).toContain('alt="Matthieu"')
    expect(html).toContain(
      "https://mdoultremont.com/cdn-cgi/image/width=320,fit=scale-down,quality=80,format=auto,onerror=redirect/media/profile/portrait.png?v=abc123 320w"
    )
    expect(html).toContain("1200w")
    expect(html).not.toContain("1280w")
  })
})
