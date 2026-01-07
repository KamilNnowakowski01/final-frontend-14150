import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SessionHeaderProps {
  progress: number;
  completedItems: number;
  totalItems: number;
}

export function SessionHeader({ progress, completedItems, totalItems }: SessionHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Zakończ
      </Button>
      <div className="flex-1 max-w-xs mx-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Postęp</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <div className="w-20 text-right text-sm font-medium text-indigo-600">
        {completedItems} / {totalItems}
      </div>
    </div>
  );
}
