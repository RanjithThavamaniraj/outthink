import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="footer-atmosphere relative overflow-hidden border-t border-border bg-background">
      <div className="footer-smoke pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
          <h2
            className="footer-wordmark font-display select-none text-center font-extrabold uppercase tracking-tight"
            aria-label="OUTTHINK"
          >
            <span className="footer-wordmark-out">OUT</span>
            <span className="footer-wordmark-think">THINK</span>
          </h2>
        </div>
      </Container>
    </footer>
  );
}
