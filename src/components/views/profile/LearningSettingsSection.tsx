"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Settings, Save, Edit2, RotateCcw, X, BrainCircuit, Shuffle, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";
import { AUTH_API } from "@/lib/api-endpoints";
import { toast } from "sonner";
import { LevelSelectionSection, LevelOption } from "@/components/views/flashcards-prepare/LevelSelectionSection";
import { CefrLevelGrid } from "@/components/views/flashcards-prepare/CefrLevelGrid";

export function LearningSettingsSection() {
  const { user } = useAuth();
  const [dailyNewLimit, setDailyNewLimit] = useState(10);
  const [dailyReviewLimit, setDailyReviewLimit] = useState(50);
  
  // Strategy state
  const [newCardsLevel, setNewCardsLevel] = useState<string>("random");
  const [selectedCefrLevel, setSelectedCefrLevel] = useState<string>("B1_B2");

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Store initial values to revert on Cancel
  const [initialNewLimit, setInitialNewLimit] = useState(10);
  const [initialReviewLimit, setInitialReviewLimit] = useState(50);
  const [initialStrategy, setInitialStrategy] = useState<string>("random");

  const levelOptions: LevelOption[] = [
    {
      value: "random",
      label: "Losowy zestaw",
      icon: Shuffle,
      desc: "Mieszanka wszystkich poziomów",
    },
    {
      value: "selected-levels",
      label: "Dostosuj poziom",
      icon: GraduationCap,
      desc: "Wybierz konkretny poziom nauki",
    },
  ];

  // Load initial settings from user object
  useEffect(() => {
    if (user) {
      // @ts-ignore
      const newLimit = user.dailyNewLimit || 10;
      // @ts-ignore
      const reviewLimit = user.dailyReviewLimit || 50;
      // @ts-ignore
      const strategy = user.learningStrategy || 'random';
      
      setDailyNewLimit(newLimit);
      setDailyReviewLimit(reviewLimit);
      setInitialNewLimit(newLimit);
      setInitialReviewLimit(reviewLimit);
      setInitialStrategy(strategy);

      parseAndSetStrategy(strategy);
    }
  }, [user]);

  const parseAndSetStrategy = (strategy: string) => {
    if (strategy.startsWith('level_')) {
      setNewCardsLevel('selected-levels');
      // level_a1_a2 -> A1_A2
      const level = strategy.replace('level_', '').toUpperCase();
      setSelectedCefrLevel(level);
    } else {
      setNewCardsLevel(strategy);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let finalStrategy = newCardsLevel;
      if (newCardsLevel === 'selected-levels') {
        finalStrategy = `level_${selectedCefrLevel.toLowerCase()}`;
      }

      await api.patch(AUTH_API.updateSettings(), {
        dailyNewLimit,
        dailyReviewLimit,
        learningStrategy: finalStrategy,
      });
      
      toast.success("Ustawienia zapisane", {
        description: "Twoje preferencje nauki zostały zaktualizowane.",
      });
      
      setInitialNewLimit(dailyNewLimit);
      setInitialReviewLimit(dailyReviewLimit);
      setInitialStrategy(finalStrategy);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("Błąd", {
        description: "Nie udało się zapisać ustawień.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setDailyNewLimit(initialNewLimit);
    setDailyReviewLimit(initialReviewLimit);
    parseAndSetStrategy(initialStrategy);
    setIsEditing(false);
  };

  const handleReset = () => {
    setDailyNewLimit(10);
    setDailyReviewLimit(50);
    setNewCardsLevel("random");
    setSelectedCefrLevel("B1_B2");
  };

  const handleNewLimitChange = (value: number[]) => {
    setDailyNewLimit(value[0]);
  };

  const handleReviewLimitChange = (value: number[]) => {
    setDailyReviewLimit(value[0]);
  };

  const handleLevelChange = (value: string) => {
    if (!isEditing) return;
    setNewCardsLevel(value);
    if (value !== "selected-levels") {
      setSelectedCefrLevel("B1_B2"); // Reset to default if switching away
    }
  };

  const handleCefrSelect = (level: string) => {
    if (!isEditing) return;
    setSelectedCefrLevel(level);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Ustawienia nauki
        </CardTitle>
        <CardDescription>
          Dostosuj dzienne limity oraz strategię dobierania nowych słówek.
          <br />
          Zmiany będą obowiązywać od następnej sesji nauki fiszek.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="new-limit" className="text-base font-medium">
              Nowe karty dziennie
            </Label>
            <span className="text-sm font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
              {dailyNewLimit}
            </span>
          </div>
          <Slider
            id="new-limit"
            min={0}
            max={100}
            step={1}
            value={[dailyNewLimit]}
            onValueChange={handleNewLimitChange}
            disabled={!isEditing}
            className="py-2"
          />
          <p className="text-sm text-muted-foreground">
            Ile nowych słówek chcesz poznawać każdego dnia?
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="review-limit" className="text-base font-medium">
              Maksymalna liczba powtórek
            </Label>
            <span className="text-sm font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">
              {dailyReviewLimit}
            </span>
          </div>
          <Slider
            id="review-limit"
            min={0}
            max={500}
            step={1}
            value={[dailyReviewLimit]}
            onValueChange={handleReviewLimitChange}
            disabled={!isEditing}
            className="py-2"
          />
          <p className="text-sm text-muted-foreground">
            Maksymalna liczba kart do powtórzenia w jednej sesji dziennej.
          </p>
        </div>

        <div className={!isEditing ? "opacity-60 pointer-events-none grayscale transition-all duration-300" : "transition-all duration-300"}>
          <LevelSelectionSection
            selectedLevel={newCardsLevel}
            onLevelChange={handleLevelChange}
            levelOptions={levelOptions}
          />

          <CefrLevelGrid
            selectedLevel={selectedCefrLevel}
            onSelect={handleCefrSelect}
            show={newCardsLevel === "selected-levels"}
          />
        </div>

        <div className="pt-4">
          {!isEditing ? (
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                <Edit2 className="h-4 w-4" />
                Edytuj
              </Button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={handleReset} disabled={isLoading} className="gap-2 text-muted-foreground hover:text-foreground">
                <RotateCcw className="h-4 w-4" />
                Resetuj
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleCancel} disabled={isLoading} className="gap-2">
                  <X className="h-4 w-4" />
                  Anuluj
                </Button>
                <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Zapisywanie..." : "Zapisz"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
