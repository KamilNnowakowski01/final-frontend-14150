import { Card } from "@/components/ui/card";
import { Clock, Trophy, Target, CheckCircle2 } from "lucide-react";
import { QuizSessionDetails } from "../types";

interface QuizSessionStatsProps {
  session: QuizSessionDetails;
}

export function QuizSessionStats({ session }: QuizSessionStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4 flex items-center gap-4 bg-indigo-50 border-indigo-100">
        <div className="p-2 bg-white rounded-full">
          <Trophy className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-indigo-900">Wynik</p>
          <p className="text-2xl font-bold text-indigo-700">{session.score}%</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 bg-green-50 border-green-100">
        <div className="p-2 bg-white rounded-full">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-green-900">Poprawne</p>
          <p className="text-2xl font-bold text-green-700">
            {session.correctAnswers} / {session.totalQuestions}
          </p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 bg-blue-50 border-blue-100">
        <div className="p-2 bg-white rounded-full">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-900">Czas trwania</p>
          <p className="text-2xl font-bold text-blue-700">{session.duration} min</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 bg-purple-50 border-purple-100">
        <div className="p-2 bg-white rounded-full">
          <Target className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-purple-900">Pakiety</p>
          <p className="text-2xl font-bold text-purple-700">{session.packages.length}</p>
        </div>
      </Card>
    </div>
  );
}
