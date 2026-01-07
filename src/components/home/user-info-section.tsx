import { Globe, Clock } from "lucide-react";

export function UserInfoSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground bg-card p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-600" />
            <span className="font-medium">Kraj:</span>
            <span>PL</span>
          </div>
          <div className="hidden sm:block h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <span className="font-medium">Aktualny czas:</span>
            <span>November 15, 2025 04:13 PM CET</span>
          </div>
        </div>
      </div>
    </section>
  );
}
