import { Suspense } from "react"
import ChartContent from "@/components/chart-content"

export default function ChartPage() {
  return (
    <Suspense fallback={null}>
      <ChartContent />
    </Suspense>
  )
}
