import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OUTTHINK — Can You Outthink AI?",
  description:
    "Daily battles between humans and artificial intelligence. Compete, vote, climb the leaderboard and prove that human creativity still matters.",
  openGraph: {
    title: "OUTTHINK — Can You Outthink AI?",
    description:
      "Daily battles between humans and artificial intelligence. Compete, vote, and climb the leaderboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
