"use client"

export default function Spinner({ loadingState }: { loadingState: boolean }) {
  if (!loadingState) return null // Don't render the spinner if not loading

  return <span className="animate-spin inline-block">↻</span> // Your spinner icon
}
