import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted/50 py-8 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© 2025 FluentWords. Wszelkie prawa zastrzeżone.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/terms" className="hover:text-foreground">Warunki</Link>
          <Link href="/privacy" className="hover:text-foreground">Prywatność</Link>
        </div>
      </div>
    </footer>
  );
}
