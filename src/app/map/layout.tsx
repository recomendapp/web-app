import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Map"
}
interface MapLayoutProps {
  children: React.ReactNode
}

export default function MapLayout({ children }: MapLayoutProps) {
  return (
    <>
      {children}
    </>
  )
}