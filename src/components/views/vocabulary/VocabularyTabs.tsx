import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { VocabularyTabsProps, VocabularyTab } from "./types";

export function VocabularyTabs({
  tab,
  onTabChange,
  filteredWords,
  children,
}: VocabularyTabsProps) {
  return (
    <Tabs 
      value={tab} 
      onValueChange={(value) => onTabChange(value as VocabularyTab)} 
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4">
        <TabsTrigger value="all">Wszystkie</TabsTrigger>
        <TabsTrigger value="not-started">Nieprzerobione</TabsTrigger>
        <TabsTrigger value="in-progress">Uczone</TabsTrigger>
        <TabsTrigger value="mastered">Nauczone</TabsTrigger>
      </TabsList>
      <TabsContent value={tab}>
        {children}
      </TabsContent>
    </Tabs>
  );
}
