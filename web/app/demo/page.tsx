import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

export default function DemoPage() {
  return (
    <main className="p-10 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🌈 Design System Preview</h1>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Card Component</h2>
        <p className="text-sm text-muted-foreground">
          This is a simple card showing off border radius, padding, and text styles.
        </p>
      </Card>

      <div className="space-x-4">
        <Button>Primary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
      </div>
    </main>
  )
}
