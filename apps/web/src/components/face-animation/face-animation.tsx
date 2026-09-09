import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { metadata } from "../../image-metadata"
import { imageUrl } from "../responsive-image"
import {
  hoverAnimations,
  idleAnimation,
  imageCandidates,
  loadSprite,
  staticSource,
} from "./animations"
import type { FaceSprite } from "./animations"

export type FaceAnimationProps = {
  className?: string
  withHover?: boolean
  withIdle?: boolean
}

type Playback = {
  sprite: FaceSprite
  url: string
  sequence: number
  loop: boolean
}

export function FaceAnimation({
  className,
  withIdle = false,
  withHover = false,
}: FaceAnimationProps) {
  const element = useRef<HTMLSpanElement>(null)
  const [playback, setPlayback] = useState<Playback>()

  useEffect(() => {
    const node = element.current!
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let cancelled = false
    let generation = 0
    let enabled = false
    let sequence = 0
    let playingHover = false
    let hoverWaiting = false
    let nextHoverIndex = 0
    const ready = new Map<FaceSprite, HTMLImageElement>()
    const pending = new Set<FaceSprite>()

    function play(sprite: FaceSprite, loop: boolean) {
      const image = ready.get(sprite)
      if (!image) return
      setPlayback({ sprite, url: image.currentSrc, sequence: ++sequence, loop })
    }

    function rest() {
      playingHover = false
      if (withIdle && ready.has(idleAnimation)) play(idleAnimation, true)
      else setPlayback(undefined)
    }

    async function prepare(sprite: FaceSprite) {
      if (!enabled || ready.has(sprite) || pending.has(sprite)) return
      pending.add(sprite)
      const current = generation
      try {
        const image = await loadSprite(sprite)
        if (cancelled || current !== generation || !enabled) return
        ready.set(sprite, image)
        if (sprite === idleAnimation && !playingHover) rest()
        if (sprite === hoverAnimations[nextHoverIndex] && hoverWaiting) {
          hoverWaiting = false
          playingHover = true
          play(sprite, false)
          nextHoverIndex = (nextHoverIndex + 1) % hoverAnimations.length
          prepareNextHover()
        }
      } catch {
        // Keep the static face or ready animation. Retry only on a later entry.
      } finally {
        if (current === generation) pending.delete(sprite)
      }
    }

    function prepareNextHover() {
      const next = hoverAnimations[nextHoverIndex]
      if (next) void prepare(next)
    }

    function start() {
      generation++
      enabled = !motion.matches && document.readyState === "complete"
      pending.clear()
      setPlayback(undefined)
      playingHover = false
      hoverWaiting = false
      if (!enabled) return
      if (withIdle) {
        if (ready.has(idleAnimation)) rest()
        else void prepare(idleAnimation)
      }
      if (withHover && hoverAnimations[0]) void prepare(hoverAnimations[0])
      nextHoverIndex = 0
    }

    function enter(event: PointerEvent) {
      if (
        !enabled ||
        !withHover ||
        event.pointerType === "touch" ||
        motion.matches
      )
        return
      const sprite = hoverAnimations[nextHoverIndex]
      if (!sprite) return
      if (ready.has(sprite)) {
        playingHover = true
        play(sprite, false)
        nextHoverIndex = (nextHoverIndex + 1) % hoverAnimations.length
        prepareNextHover()
      } else {
        const fallback = hoverAnimations.find((candidate) =>
          ready.has(candidate)
        )
        if (fallback) {
          playingHover = true
          play(fallback, false)
        } else {
          hoverWaiting = true
          void prepare(sprite)
        }
      }
    }

    function finish(event: AnimationEvent) {
      if (event.animationName === "face-frames" && playingHover && enabled)
        rest()
    }

    const timer = window.setTimeout(start, 0)
    window.addEventListener("load", start)
    motion.addEventListener("change", start)
    node.addEventListener("pointerenter", enter)
    node.addEventListener("animationend", finish)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.removeEventListener("load", start)
      motion.removeEventListener("change", start)
      node.removeEventListener("pointerenter", enter)
      node.removeEventListener("animationend", finish)
    }
  }, [withIdle, withHover])

  const style = playback
    ? ({
        "--frames": playback.sprite.frameCount,
        "--duration": `${playback.sprite.frameCount * playback.sprite.frameDurationMs}ms`,
        "--iterations": playback.loop ? "infinite" : 1,
      } as CSSProperties)
    : undefined

  return (
    <span
      ref={element}
      aria-hidden="true"
      className={["face-animation", className].filter(Boolean).join(" ")}
      style={style}
    >
      <img
        className="face-static"
        src={imageUrl(staticSource, 40, metadata[staticSource].version)}
        srcSet={imageCandidates(staticSource)}
        width={40}
        height={40}
        alt=""
      />
      {playback && (
        <span className="face-viewport" key={playback.sequence}>
          <img className="face-strip" src={playback.url} alt="" />
        </span>
      )}
    </span>
  )
}
