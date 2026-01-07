import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  backHref?: string;
  className?: string;
}

export function PageHeader({ title, description, icon, backHref, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start gap-4 pb-2", className)}>
      {backHref && (
        <Button variant="ghost" size="icon" asChild className="mt-1 shrink-0">
          <Link href={backHref}>
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
      )}
      
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          {icon && <div className="text-indigo-600 [&>svg]:h-8 [&>svg]:w-8">{icon}</div>}
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
        {description && (
          <p className="text-muted-foreground text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
