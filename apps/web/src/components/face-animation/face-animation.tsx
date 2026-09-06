import { useEffect, useState } from "react"
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react"
import faceSpriteUrl from "./sprite.png"

export type FaceAnimationProps = {
  className?: string
  withHover?: boolean
  withIdle?: boolean
}

const columnCount = 9
const rowCount = 4

const animations = {
  reference: { row: 0, frameCount: 1, frameDurationMs: 0 },
  idle: { row: 1, frameCount: 9, frameDurationMs: 200 },
  blink: { row: 2, frameCount: 9, frameDurationMs: 70 },
  wink: { row: 3, frameCount: 9, frameDurationMs: 80 },
} as const

type AnimationName = keyof typeof animations
type HoverAnimationName = "blink" | "wink"

type Playback = {
  animation: AnimationName
  frameIndex: number
}

const restingPlayback: Playback = { animation: "reference", frameIndex: 0 }
const hoverAnimations = ["blink", "wink"] as const

function startAnimation(animation: AnimationName): Playback {
  return { animation, frameIndex: 0 }
}

function randomHoverAnimation(): HoverAnimationName {
  const index = Math.floor(Math.random() * hoverAnimations.length)
  return hoverAnimations[index]
}

function framePosition(animation: AnimationName, frameIndex: number) {
  const row = animations[animation].row

  return {
    x: (frameIndex / (columnCount - 1)) * 100,
    y: (row / (rowCount - 1)) * 100,
  }
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    function updatePreference() {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)

    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  return prefersReducedMotion
}

export function FaceAnimation({
  className,
  withHover = false,
  withIdle = false,
}: FaceAnimationProps) {
  const [playback, setPlayback] = useState<Playback>(restingPlayback)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setPlayback(restingPlayback)
      return
    }

    if (playback.animation === "reference") {
      if (withIdle) setPlayback(startAnimation("idle"))
      return
    }

    const animation = animations[playback.animation]
    const timer = window.setTimeout(() => {
      setPlayback((current) => {
        const currentAnimation = animations[current.animation]
        const isLastFrame =
          current.frameIndex === currentAnimation.frameCount - 1

        if (!isLastFrame) {
          return { ...current, frameIndex: current.frameIndex + 1 }
        }

        if (current.animation === "idle" && withIdle) {
          return startAnimation("idle")
        }

        return withIdle ? startAnimation("idle") : restingPlayback
      })
    }, animation.frameDurationMs)

    return () => window.clearTimeout(timer)
  }, [playback, prefersReducedMotion, withIdle])

  function handlePointerEnter(event: ReactPointerEvent<HTMLSpanElement>) {
    if (event.pointerType === "touch" || !withHover || prefersReducedMotion) {
      return
    }

    setPlayback(startAnimation(randomHoverAnimation()))
  }

  const visiblePlayback = prefersReducedMotion ? restingPlayback : playback
  const position = framePosition(
    visiblePlayback.animation,
    visiblePlayback.frameIndex
  )
  const style: CSSProperties = {
    backgroundImage: `url(${faceSpriteUrl})`,
    backgroundPosition: `${position.x}% ${position.y}%`,
  }

  return (
    <span
      aria-hidden="true"
      className={["bg-no-repeat bg-size-[900%_400%]", className]
        .filter(Boolean)
        .join(" ")}
      onPointerEnter={handlePointerEnter}
      style={style}
    />
  )
}
