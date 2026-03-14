import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Study Buddy",
  description: "Turn notes into summaries, quizzes, and flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}