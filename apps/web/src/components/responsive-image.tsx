import type { ImgHTMLAttributes } from "react"
import type { ImageMetadata } from "../../tooling/image-metadata"

const widths = [320, 480, 640, 768, 1024, 1280, 1536]

export function imageUrl(src: string, width: number, version: string) {
  const options = `width=${width},fit=scale-down,quality=80,format=auto,onerror=redirect`
  return `/cdn-cgi/image/${options}${src}?v=${version}`
}

type Props = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height"
> & {
  src: string
  image: ImageMetadata
  optimized?: boolean
  sizes?: string
}

export function ResponsiveImage({
  src,
  image,
  optimized = true,
  sizes = "100vw",
  ...props
}: Props) {
  const candidates = [
    ...widths.filter((width) => width < image.width),
    image.width,
  ]
  const srcSet = optimized
    ? candidates
        .map((width) => `${imageUrl(src, width, image.version)} ${width}w`)
        .join(",")
    : undefined
  return (
    <img
      {...props}
      alt={props.alt ?? ""}
      src={
        optimized
          ? imageUrl(src, Math.min(image.width, 640), image.version)
          : src
      }
      srcSet={srcSet}
      sizes={optimized ? sizes : undefined}
      width={image.width}
      height={image.height}
    />
  )
}
