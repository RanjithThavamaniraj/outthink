import Image from "next/image";

type HeroHandsBlendProps = {
  variant?: "column" | "ambient";
  className?: string;
};

export function HeroHandsBlend({
  variant = "column",
  className = "",
}: HeroHandsBlendProps) {
  if (variant === "ambient") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      >
        <Image
          src="/hero-hands.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.16] sm:opacity-[0.2]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_0%,#050505_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background from-0% via-transparent via-50% to-background to-100%" />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[44px] ${className}`}
      aria-hidden
    >
      <Image
        src="/hero-hands.png"
        alt=""
        fill
        priority
        className="object-cover object-[52%_center] scale-105"
        sizes="(max-width: 1024px) 100vw, 42vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-br from-human/8 via-transparent to-ai/8" />
      <div className="absolute inset-0 mix-blend-soft-light opacity-40 bg-[radial-gradient(circle_at_55%_50%,rgba(74,222,128,0.12),transparent_45%),radial-gradient(circle_at_60%_50%,rgba(96,165,250,0.1),transparent_40%)]" />
    </div>
  );
}
