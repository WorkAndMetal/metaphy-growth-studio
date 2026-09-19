import type { Metadata } from "next";
import MetroHero from "@/components/ui/scroll-locked-video-hero";

export const metadata: Metadata = {
  title: "Metaphy | Markanız için yeni kapılar açıyoruz",
  description: "Strateji, yaratıcılık ve performansı bir araya getiren dijital reklam ajansı. Metaphy ile markanızın büyüme yolculuğunu keşfedin.",
};

export default function SecondSection() {
  return (
    <main className="relative">
      <MetroHero
        videoSrc="/media/metro-scrub.mp4"
        title="Markanız için yeni kapılar açıyoruz."
        scrollHint="KEŞFETMEK İÇİN KAYDIR"
        tagline="Hayallerinizdeki reklam ajansı. Büyüme yolculuğunuzda yanınızda."
        signature={false}
      />
      <div className="pointer-events-none absolute right-5 top-20 z-10 text-right text-white sm:right-8 sm:top-5">
        <p className="text-lg font-semibold tracking-[-0.04em]">Metaphy<span className="font-normal text-blue-200"> Growth Studio</span></p>
        <p className="mt-1 text-[9px] tracking-[0.24em] text-white/60">DİJİTAL REKLAM AJANSI</p>
      </div>
      <p className="pointer-events-none absolute bottom-5 left-0 z-10 w-full px-5 text-center text-[8px] tracking-[0.16em] text-white/60 sm:bottom-7 sm:left-8 sm:w-auto sm:px-0 sm:text-left sm:text-[10px]">
        STRATEJİ · KREATİF · PERFORMANS
      </p>
    </main>
  );
}
