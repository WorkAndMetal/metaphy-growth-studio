"use client";

import { ArrowUpRight, Target, Sparkles, ChartNoAxesCombined } from "lucide-react";
import { TalkingRobot } from "@/components/talking-robot";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function AgencySpline() {
  return (
    <main className="min-h-screen bg-[#06080d] px-5 pb-8 pt-24 text-white md:px-10 lg:px-16">
      <header className="mx-auto mb-8 flex max-w-7xl items-end justify-between border-b border-white/10 pb-6">
        <div><p className="text-xl font-semibold tracking-tight">Metaphy <span className="font-normal text-slate-400">Growth Agency</span></p><p className="mt-2 text-[10px] tracking-[0.2em] text-blue-200/70">DİJİTAL REKLAM AJANSI</p></div>
        <span className="hidden text-xs text-slate-500 sm:block">Fikirden etkiye.</span>
      </header>
      <Card className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border-white/10 bg-[#0a0d14] text-white">
        <Spotlight size={480} className="from-blue-300/15 via-blue-200/5 to-transparent" />
        <div className="relative grid lg:min-h-[610px] lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="mb-7 flex items-center gap-3 text-[10px] tracking-[0.2em] text-blue-200"><span className="h-1.5 w-1.5 rounded-full bg-blue-200" />YARATICILIK × TEKNOLOJİ</p>
            <h1 className="text-4xl font-semibold leading-[1.07] tracking-[-0.05em] sm:text-5xl xl:text-6xl">Markanızın<br />geleceğine<br /><span className="bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">yeni bir boyut.</span></h1>
            <p className="mt-7 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">Dikkat çeken fikirleri, sonuç odaklı stratejilerle buluşturuyoruz. Yaratıcı kampanyalardan dijital deneyimlere kadar markanızın hikâyesini güçlendiriyor, büyüme hedeflerinizi merkeze alıyoruz.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/#hizmetler" className="inline-flex items-center gap-6 rounded-full bg-blue-100 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-white">Hizmetleri keşfet <ArrowUpRight size={17} /></a>
              <a href="/#yaklasim" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm text-slate-200 transition-colors hover:bg-white/10">Nasıl çalışıyoruz?</a>
            </div>
          </div>
          <div role="region" aria-label="Etkileşimli 3D robot deneyimi" className="relative h-[380px] min-w-0 sm:h-[460px] lg:h-full lg:min-h-[610px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-12 rounded-full bg-blue-500/10 blur-3xl" />
            <TalkingRobot />
          </div>
        </div>
      </Card>
      <section aria-label="Uzmanlık alanlarımız" className="mx-auto mt-6 grid max-w-7xl gap-4 md:grid-cols-3">
        {[
          { icon: Target, title: "Stratejiyle yön buluruz.", text: "Markanızı, kitlenizi ve hedeflerinizi analiz eder; büyüme için net bir yol haritası oluştururuz." },
          { icon: Sparkles, title: "Yaratıcılıkla iz bırakırız.", text: "Tasarım, içerik ve kampanya fikirleriyle markanızı akılda kalan deneyimlere dönüştürürüz." },
          { icon: ChartNoAxesCombined, title: "Veriyle ileri gideriz.", text: "Reklam performansını ölçer, testlerden öğrenir ve her adımı daha etkili hale getiririz." },
        ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"><Icon size={21} className="mb-5 text-blue-200" /><h2 className="mb-3 text-base font-medium">{title}</h2><p className="text-sm leading-6 text-slate-400">{text}</p></article>)}
      </section>
      <footer className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 text-[11px] text-slate-500 sm:flex-row"><span>Metaphy Growth Agency</span><span>Hayallerinizdeki reklam ajansı.</span></footer>
    </main>
  );
}
