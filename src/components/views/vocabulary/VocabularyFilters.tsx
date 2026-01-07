import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { VocabularyFiltersProps } from "./types";

export function VocabularyFilters({
  search,
  onSearchChange,
  levelFilter,
  onLevelFilterChange,
  sortOrder,
  onSortOrderChange,
}: VocabularyFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Szukaj słowa lub tłumaczenia..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={sortOrder} onValueChange={onSortOrderChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Sortowanie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Domyślne</SelectItem>
          <SelectItem value="asc">A-Z</SelectItem>
          <SelectItem value="desc">Z-A</SelectItem>
        </SelectContent>
      </Select>
      <Select value={levelFilter} onValueChange={onLevelFilterChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Poziom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Wszystkie</SelectItem>
          {["A1", "A2", "B1", "B2", "C1", "C2"].map((lvl) => (
            <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
