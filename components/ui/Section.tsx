import { type ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Draws a subtle top gradient seam for visual continuity between sections. */
  flow?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  flow = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`site-section relative py-12 sm:py-16 lg:py-[4.5rem] ${className}`}
    >
      {flow && <div className="section-flow-seam" aria-hidden />}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
