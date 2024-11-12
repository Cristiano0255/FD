import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Plane, BookOpen } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Dispatchers</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voli Prenotati</CardTitle>
            <Plane className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lezioni Completate</CardTitle>
            <BookOpen className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}