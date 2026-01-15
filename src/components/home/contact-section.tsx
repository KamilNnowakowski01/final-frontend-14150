import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skontaktuj się z nami</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <Mail className="h-10 w-10 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Email</h3>
            <p className="text-muted-foreground">-</p>
          </Card>
          <Card className="p-6 text-center">
            <Phone className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold">Telefon</h3>
            <p className="text-muted-foreground">-</p>
          </Card>
          <Card className="p-6 text-center">
            <MapPin className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold">Adres</h3>
            <p className="text-muted-foreground">-</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
