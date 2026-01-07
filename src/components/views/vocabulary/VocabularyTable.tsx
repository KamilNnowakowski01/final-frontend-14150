import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Volume2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VocabularyTableProps, VocabularyWord } from "./types";

const getStatusBadge = (word: VocabularyWord) => {
  if (word.mastered)
    return <Badge className="bg-green-600 text-white text-xs">Nauczone</Badge>;
  if (word.learned)
    return <Badge className="bg-violet-600 text-white text-xs">Uczone</Badge>;
  return <Badge variant="outline" className="text-xs">Nieprzerobione</Badge>;
};

export function VocabularyTable({ words }: VocabularyTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20 pl-6">Poziom</TableHead>
            <TableHead className="w-40">Część mowy</TableHead>
            <TableHead className="w-36">Słowo</TableHead>
            <TableHead className="w-16 text-center">Audio</TableHead>
            <TableHead className="w-32">Wymowa</TableHead>
            <TableHead className="min-w-44">Tłumaczenie</TableHead>
            <TableHead className="w-28 text-center pr-6">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((word) => (
            <TableRow
              key={word.id}
              className={`transition-colors ${
                word.mastered
                  ? "bg-green-50/30"
                  : word.learned
                  ? "bg-violet-50/30"
                  : ""
              }`}
            >
              <TableCell className="pl-6">
                <Badge variant="outline" className="text-xs">
                  {word.level}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 flex-wrap">
                  {Array.isArray(word.part_of_speech) && word.part_of_speech.length > 0 ? (
                    <>
                      <Badge variant="outline" className="text-xs capitalize">
                        {word.part_of_speech[0]}
                      </Badge>
                      {word.part_of_speech.length > 1 && (
                        <Badge variant="outline" className="text-xs">
                          +{word.part_of_speech.length - 1}
                        </Badge>
                      )}
                    </>
                  ) : (
                    <span className="text-muted-foreground text-xs">-</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`/dashboard/word/${word.id}`} className="hover:underline hover:text-primary">
                  {word.word}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm font-mono">
                {word.pronunciation}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs border border-gray-400">
                    {word.meaning.length}
                  </Badge>
                  <span className="font-medium">{word.meaning[0]}</span>
                </div>
              </TableCell>
              <TableCell className="text-center pr-6">
                {getStatusBadge(word)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
