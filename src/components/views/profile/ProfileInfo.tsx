import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Mail, Calendar, Shield, Fingerprint, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface UserData {
  id: string | number;
  name?: string;
  surname?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  createdAt?: string;
}

interface ProfileInfoProps {
  user: UserData;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const [showId, setShowId] = useState(false);
  const name = user.name || user.firstName || "";
  const surname = user.surname || user.lastName || "";
  const initials = `${name?.[0] || ''}${surname?.[0] || ''}`.toUpperCase();
  const role = user.role || "user";
  const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Dane użytkownika</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{name} {surname}</h3>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between gap-3 p-3 border rounded-lg md:col-span-2">
            <div className="flex items-center gap-3">
              <Fingerprint className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">ID</p>
                <p className="font-medium font-mono">
                  {showId ? user.id : "•".repeat(String(user.id).length || 8)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => setShowId(!showId)}
            >
              {showId ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Imię i nazwisko</p>
              <p className="font-medium">{name} {surname}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rola</p>
              <p className="font-medium capitalize">{role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data dołączenia</p>
              <p className="font-medium">{joinedDate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
