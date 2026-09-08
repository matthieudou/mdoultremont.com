/// <reference types="vite/client" />
declare module "virtual:portfolio-images" {
  const metadata: Record<
    string,
    { width: number; height: number; version: string }
  >
  export default metadata
}
