import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Square } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Session } from "./types";

interface SessionTableProps {
  sessions: Session[];
  onDetails: (id: string) => void;
}

const getModeLabel = (mode: string) => {
  switch (mode) {
    case "adaptive-ai": return "Adaptacyjny AI";
    case "a1-c2": return "A1–C2";
    case "random": return "Losowy zestaw";
    default: return mode;
  }
};

export function SessionTable({ sessions, onDetails }: SessionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Tryb</TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Square className="h-4 w-4 text-blue-600 fill-blue-600/20" />
                <span className="text-xs font-medium">Nowe</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Square className="h-4 w-4 text-purple-600 fill-purple-600/20" />
                <span className="text-xs font-medium">Do recenzji</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Square className="h-4 w-4 text-black fill-black/20" />
                <span className="text-xs font-medium">Suma recenzji</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Square className="h-4 w-4 text-red-600 fill-red-600/20" />
                <span className="text-xs font-medium">Do powtórki</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Square className="h-4 w-4 text-green-600 fill-green-600/20" />
                <span className="text-xs font-medium">Zaliczone</span>
              </div>
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sessions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                Brak sesji do wyświetlenia
              </TableCell>
            </TableRow>
          ) : (
            sessions.map((session) => (
              <TableRow
                key={session.id}
                className="hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onDetails(session.id)}
              >
                <TableCell className="font-medium">
                  {format(session.date, "dd.MM.yyyy", { locale: pl })}
                  <div className="text-xs text-muted-foreground capitalize">
                    {format(session.date, "EEEE", { locale: pl })}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {getModeLabel(session.mode)}
                  </Badge>
                </TableCell>

                <TableCell className="text-center text-blue-600 font-medium">
                  {session.newCards ?? "-"}
                </TableCell>

                <TableCell className="text-center text-purple-600 font-medium">
                  {session.reviewCards ?? "-"}
                </TableCell>

                <TableCell className="text-center font-semibold">
                  {session.totalCards}
                </TableCell>

                <TableCell className="text-center text-red-600 font-medium">
                  {session.repeatCards ?? "-"}
                </TableCell>

                <TableCell className="text-center text-green-600 font-medium">
                  {session.masteredCards ?? "-"}
                </TableCell>

                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
