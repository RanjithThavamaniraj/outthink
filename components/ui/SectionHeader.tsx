import { FadeIn } from "@/components/animations/FadeIn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  scanline?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  scanline = false,
}: SectionHeaderProps) {
  return (
    <FadeIn>
      <div className="section-header mx-auto max-w-3xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted">
          {eyebrow}
        </p>
        <h2
          className={`mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-text-primary sm:text-4xl ${
            scanline ? "scanline-heading" : ""
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-text-muted">
            {description}
          </p>
        ) : null}
      </div>
    </FadeIn>
  );
}
