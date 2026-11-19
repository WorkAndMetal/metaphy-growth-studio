import type { Metadata } from "next";
import { MoodBoardDemo } from "@/components/mood-board-demo";

export const metadata: Metadata = {
  title: "Metaphy Growth Agency | Mood Board",
  description: "Metaphy Growth Agency'nin hareket, görsel fikir ve ilham panosu.",
};

export default function SixthSection() {
  return <MoodBoardDemo />;
}
