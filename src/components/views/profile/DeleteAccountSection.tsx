"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";
import { AUTH_API } from "@/lib/api-endpoints";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteAccountSection() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [emailConfirm, setEmailConfirm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (emailConfirm !== user?.email) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete(AUTH_API.deleteProfile());
      
      toast.success("Konto usunięte", {
        description: "Twoje konto zostało pomyślnie usunięte.",
      });

      logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error("Błąd", {
        description: "Nie udało się usunąć konta. Spróbuj ponownie później.",
      });
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <Card className="border-red-200 bg-red-50/30 mt-8">
      <CardHeader>
        <CardTitle className="text-red-600 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Strefa niebezpieczna
        </CardTitle>
        <CardDescription>
          Te operacje są nieodwracalne. Bądź ostrożny.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-medium">Usuń konto</h4>
            <p className="text-sm text-muted-foreground">
              Trwale usuń swoje konto i wszystkie powiązane dane (fiszki, statystyki).
            </p>
          </div>
          
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Usuń konto
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Czy jesteś absolutnie pewien?</AlertDialogTitle>
                <AlertDialogDescription className="space-y-5">
                  <p className="leading-relaxed">
                    Ta operacja jest <strong>nieodwracalna</strong>. Spowoduje trwałe usunięcie Twojego konta
                    oraz wszystkich Twoich postępów w nauce, fiszek i statystyk.
                  </p>
                  <div className="space-y-4 mt-6">
                    <Label htmlFor="confirm-email" className="text-foreground">
                      Aby potwierdzić, wpisz swój adres email: <span className="font-mono font-bold">{user?.email}</span>
                    </Label>
                    <Input
                      id="confirm-email"
                      value={emailConfirm}
                      onChange={(e) => setEmailConfirm(e.target.value)}
                      placeholder={user?.email}
                      className="mt-2"
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setEmailConfirm("")}>Anuluj</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  disabled={emailConfirm !== user?.email || isDeleting}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  {isDeleting ? "Usuwanie..." : "Tak, usuń konto"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
