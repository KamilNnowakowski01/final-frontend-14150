import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SessionItem } from "@/hooks/flashcards/useSessionDetails";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Link from "next/link";

interface SessionItemsTableProps {
  items: SessionItem[];
}

const getStatusBadge = (status: string) => {
  if (status === 'new') {
    return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Nowe</Badge>;
  }
  if (status === 'review') {
    return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">Recenzja</Badge>;
  }
  return <Badge variant="outline">{status}</Badge>;
};

const getStageBadge = (stage: string) => {
  if (stage === 'passed') {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Zaliczone</Badge>;
  }
  if (stage === 'learning') {
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Powtórka</Badge>;
  }
  if (stage === 'review') {
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Oczekująca</Badge>;
  }
  return <Badge variant="outline" className="capitalize">{stage}</Badge>;
};

export function SessionItemsTable({ items }: SessionItemsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Słówko</TableHead>
            <TableHead className="text-center">Powtórki</TableHead>
            <TableHead className="text-center">Łatwość</TableHead>
            <TableHead className="text-right">Następna</TableHead>
            <TableHead className="text-center">Etap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                Brak słówek w tej sesji.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                <TableCell className="font-medium">
                  {item.wordId ? (
                    <Link 
                      href={`/dashboard/word/${item.wordId}`}
                      className="text-indigo-600 hover:underline hover:text-indigo-800 transition-colors"
                    >
                      {item.word}
                    </Link>
                  ) : (
                    item.word
                  )}
                </TableCell>
                <TableCell className="text-center">{item.repetitionsCount ?? "-"}</TableCell>
                <TableCell className="text-center">{item.easinessFactor?.toFixed(2) ?? "-"}</TableCell>
                <TableCell className="text-right">
                  {item.nextReviewDate 
                    ? format(item.nextReviewDate, "dd.MM.yyyy", { locale: pl }) 
                    : "-"}
                </TableCell>
                <TableCell className="text-center">{getStageBadge(item.stage)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
