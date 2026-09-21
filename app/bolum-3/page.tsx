import type { Metadata } from "next";
import { GrowthSystem } from "@/components/growth-system";

export const metadata: Metadata = {
  title: "Metaphy Growth Agency | Büyümenin Bağlantı Noktası",
  description: "Strateji, kreatif ve performans. Metaphy'nin markanız için bir araya getirdiği büyüme yaklaşımını keşfedin.",
};

export default function ThirdSection() {
  return <GrowthSystem />;
}
