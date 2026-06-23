import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="footer-atmosphere relative overflow-hidden border-t border-border bg-background">
      <div className="footer-smoke pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <div className="flex items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28">
          <h2
            className="footer-wordmark font-display select-none text-center font-extrabold uppercase tracking-tight"
            aria-label="OUTTHINK"
          >
            OUTTHINK
          </h2>
        </div>
      </Container>
    </footer>
  );
}
