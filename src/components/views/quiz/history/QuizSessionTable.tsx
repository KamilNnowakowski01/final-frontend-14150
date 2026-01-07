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
import { ChevronRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { QuizSession } from "./types";
import Link from "next/link";

interface QuizSessionTableProps {
  sessions: QuizSession[];
}

export function QuizSessionTable({ sessions }: QuizSessionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right w-[100px]">Wynik</TableHead>
            <TableHead className="text-right w-[120px]">Poprawne</TableHead>
            <TableHead className="text-right w-[120px]">Szczegóły</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">
                {format(session.date, "d MMMM yyyy, HH:mm", { locale: pl })}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={session.status === 'completed' ? 'outline' : 'secondary'}
                  className={session.status === 'completed' ? 'bg-white text-black hover:bg-gray-50' : ''}
                >
                  {session.status === 'completed' ? 'Zakończony' : 'W trakcie'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-medium">{session.score}%</span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-medium">
                  {session.correctAnswers}/{session.totalQuestions}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/dashboard/quiz/${session.id}`}>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {sessions.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                Brak historii quizów
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
