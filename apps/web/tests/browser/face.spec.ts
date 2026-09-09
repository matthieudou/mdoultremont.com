import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.route(
    "**/cdn-cgi/image/**/media/brand/face/*.png*",
    async (route) => {
      const name = new URL(route.request().url()).pathname.split("/").pop()
      await route.fulfill({
        path: `public/media/brand/face/${name}`,
        contentType: "image/png",
      })
    }
  )
})

test("prepares blink with idle and plays it on pointer entry before returning to idle", async ({
  page,
}) => {
  const blink = page.waitForResponse((response) =>
    response.url().includes("/face/blink.png")
  )
  await page.goto("/")
  await blink
  const home = page.getByRole("link", { name: /Matthieu.*home/ })
  await expect(home.locator("img").last()).toHaveAttribute("src", /idle\.png/)
  await page.waitForTimeout(100)
  await home.locator("span").first().hover()
  await expect(home.locator("img").last()).toHaveAttribute("src", /blink\.png/)
  await page.mouse.move(0, 0)
  await expect(home.locator("img").last()).toHaveAttribute("src", /idle\.png/)
})

test("cycles to wink after blink and preloads the following hover expression", async ({
  page,
}) => {
  await page.goto("/")
  const home = page.getByRole("link", { name: /Matthieu.*home/ })
  await expect(home.locator("img").last()).toHaveAttribute("src", /idle\.png/)
  await home.locator("span").first().hover()
  await expect(home.locator("img").last()).toHaveAttribute("src", /blink\.png/)
  await page.mouse.move(0, 0)
  await expect(home.locator("img").last()).toHaveAttribute("src", /idle\.png/)
  await home.locator("span").first().hover()
  await expect(home.locator("img").last()).toHaveAttribute("src", /wink\.png/)
})

test("plays the first hover after an early pointer entry once it is decoded", async ({
  page,
}) => {
  let release!: () => void
  const held = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route(
    "**/cdn-cgi/image/**/media/brand/face/blink.png*",
    async (route) => {
      await held
      await route.fulfill({
        path: "public/media/brand/face/blink.png",
        contentType: "image/png",
      })
    }
  )
  await page.goto("/")
  const home = page.getByRole("link", { name: /Matthieu.*home/ })
  await home.locator("span").first().hover()
  release()
  await expect(home.locator("img").last()).toHaveAttribute("src", /blink\.png/)
})

test("keeps the static face until deferred idle finishes decoding", async ({
  page,
}) => {
  let release!: () => void
  const held = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route(
    "**/cdn-cgi/image/**/media/brand/face/idle.png*",
    async (route) => {
      await held
      await route.fulfill({
        path: "public/media/brand/face/idle.png",
        contentType: "image/png",
      })
    }
  )
  await page.goto("/")
  const home = page.getByRole("link", { name: /Matthieu.*home/ })
  await expect(home.locator("img").first()).toBeVisible()
  expect(await home.locator("img").count()).toBe(1)
  release()
  await expect(home.locator("img")).toHaveCount(2)
  await expect
    .poll(() =>
      home.evaluate((el) => el.getAnimations({ subtree: true }).length)
    )
    .toBe(1)
})

test("reduced motion renders a responsive static home icon without animation requests", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  const spriteRequests: string[] = []
  page.on("request", (request) => {
    if (/\/(idle|blink|wink|sprite)[^/]*\.(png|webp)/.test(request.url())) {
      spriteRequests.push(request.url())
    }
  })
  await page.goto("/")
  const home = page.getByRole("link", { name: /Matthieu.*home/ })
  await expect(home).toHaveAttribute("href", "/")
  const face = home.locator("img").first()
  await expect(face).toBeVisible()
  await expect(face).toHaveAttribute(
    "srcset",
    /width=40,.* 1x,.*width=80,.* 2x,.*width=120,.* 3x/
  )
  expect(spriteRequests).toEqual([])
})
