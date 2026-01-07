import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionDetail } from "@/hooks/flashcards/useSessionDetails";
import { Square } from "lucide-react";

interface SessionStatsCardsProps {
  session: SessionDetail;
}

export function SessionStatsCards({ session }: SessionStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nowe karty</CardTitle>
          <Square className="h-4 w-4 text-blue-600 fill-blue-600/20" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{session.newCards}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Do recenzji</CardTitle>
          <Square className="h-4 w-4 text-purple-600 fill-purple-600/20" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{session.reviewCards}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Do powtórki</CardTitle>
          <Square className="h-4 w-4 text-red-600 fill-red-600/20" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{session.repeatCards}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Zaliczone</CardTitle>
          <Square className="h-4 w-4 text-green-600 fill-green-600/20" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{session.masteredCards}</div>
        </CardContent>
      </Card>
    </div>
  );
}
