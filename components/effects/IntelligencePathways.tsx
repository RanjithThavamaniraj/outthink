"use client";

type IntelligencePathwaysProps = {
  className?: string;
};

export function IntelligencePathways({ className = "" }: IntelligencePathwaysProps) {
  return (
    <svg
      className={`why-exists-pathways ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="human-path-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="rgba(74,222,128,0)" />
          <stop offset="45%" stopColor="rgba(74,222,128,0.35)" />
          <stop offset="100%" stopColor="rgba(74,222,128,0.08)" />
        </linearGradient>
        <linearGradient id="ai-path-gradient" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="rgba(96,165,250,0)" />
          <stop offset="45%" stopColor="rgba(96,165,250,0.35)" />
          <stop offset="100%" stopColor="rgba(96,165,250,0.08)" />
        </linearGradient>
        <radialGradient id="convergence-glow" cx="50%" cy="52%" r="35%">
          <stop offset="0%" stopColor="rgba(245,245,245,0.12)" />
          <stop offset="55%" stopColor="rgba(74,222,128,0.04)" />
          <stop offset="100%" stopColor="rgba(96,165,250,0)" />
        </radialGradient>
      </defs>

      <ellipse cx="600" cy="420" rx="280" ry="200" fill="url(#convergence-glow)" />

      <g className="why-exists-pathways-human" stroke="url(#human-path-gradient)" fill="none">
        <path d="M -20 180 C 120 160, 200 240, 340 280 C 460 312, 520 360, 580 400" />
        <path d="M -20 320 C 140 300, 240 340, 380 380 C 480 408, 540 420, 600 430" />
        <path d="M -20 460 C 100 480, 220 440, 360 420 C 470 404, 540 400, 600 410" />
        <path d="M -20 600 C 160 560, 280 520, 420 480 C 510 452, 560 440, 600 435" />
        <circle cx="580" cy="400" r="3" fill="rgba(74,222,128,0.25)" stroke="none" />
        <circle cx="600" cy="430" r="2.5" fill="rgba(74,222,128,0.2)" stroke="none" />
      </g>

      <g className="why-exists-pathways-ai" stroke="url(#ai-path-gradient)" fill="none">
        <path d="M 1220 200 C 1080 220, 980 260, 840 300 C 720 332, 640 380, 620 400" />
        <path d="M 1220 340 C 1060 360, 960 350, 820 370 C 700 386, 640 410, 600 430" />
        <path d="M 1220 480 C 1100 500, 1000 460, 860 440 C 730 422, 640 410, 600 410" />
        <path d="M 1220 620 C 1040 580, 920 540, 780 500 C 690 472, 640 450, 600 435" />
        <circle cx="620" cy="400" r="3" fill="rgba(96,165,250,0.25)" stroke="none" />
        <circle cx="600" cy="410" r="2.5" fill="rgba(96,165,250,0.2)" stroke="none" />
      </g>
    </svg>
  );
}
