import { Separator } from "@/components/ui/separator";
import { Target } from "lucide-react";

export function QuizHeader() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Target className="h-10 w-10 text-indigo-600" />
            Quiz – Start!
          </h1>
          <p className="text-lg text-muted-foreground">
            Rozpocznij sesję i zacznij sprawdzać swoją wiedzę!
          </p>
        </div>
      </div>
      <Separator />
    </>
  );
}
