import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuizPackage } from "../types";
import { QuizPackageViewer } from "./QuizPackageViewer";

interface QuizPackageListProps {
  packages: QuizPackage[];
}

export function QuizPackageList({ packages }: QuizPackageListProps) {
  return (
    <Accordion type="multiple" className="space-y-4">
      {packages.map((pkg, index) => (
        <AccordionItem key={pkg.id} value={pkg.id} className="border rounded-lg bg-white overflow-hidden last:border-b">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between flex-1 pr-4">
              <div className="space-y-1 text-left">
                <div className="text-lg font-bold flex items-center gap-2">
                  Zestaw {index + 1}
                  <Badge variant="outline" className="ml-2 bg-white">
                    {pkg.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-normal">
                  Wynik: {pkg.score}% ({pkg.correctAnswers}/{pkg.totalQuestions})
                </p>
              </div>
              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                <div 
                  className="h-full bg-indigo-600 transition-all" 
                  style={{ width: `${pkg.score}%` }}
                />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 border-t">
            <QuizPackageViewer pkg={pkg} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
