"use client";

import { ArrowUpRight, ArrowDown, Orbit, Target, Layers3, ChartNoAxesCombined, Check, MoveUpRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

function CampaignPreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[#162b22]/10 px-5 py-4 md:px-7">
        <span className="flex items-center gap-2 text-sm font-semibold tracking-tight"><Orbit size={19} /> metaphy<span className="hidden font-normal text-[#718176] sm:inline"> / growth agency</span></span>
        <span className="rounded-full border border-[#162b22]/15 px-2.5 py-1 text-[9px] tracking-widest text-[#5a7062]">ÖRNEK KAMPANYA PLANI</span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-44 shrink-0 border-r border-[#162b22]/10 p-5 text-xs text-[#6b7c70] lg:block">
          <p className="mb-5 text-[9px] tracking-[0.18em]">BÜYÜME ALANINIZ</p>
          <p className="mb-5 rounded-lg bg-[#d9e8dd] px-3 py-2 font-medium text-[#1c4c33]">Genel bakış</p>
          <p className="mb-6 px-3">Marka stratejisi</p><p className="mb-6 px-3">Kreatif üretim</p><p className="mb-6 px-3">Medya planı</p><p className="mb-6 px-3">Ölçümleme</p>
          <div className="mt-12 border-t border-[#162b22]/10 pt-5 text-[10px] leading-5">Tek ekip.<br />Ortak büyüme hedefi.</div>
        </aside>
        <div className="min-w-0 flex-1 p-4 md:p-7">
          <div className="flex items-start justify-between gap-3"><div><p className="text-[9px] tracking-[0.2em] text-[#6a7e70]">STRATEJİDEN SONUCA</p><h2 className="mt-2 text-xl font-semibold tracking-tight md:text-3xl">Bir sonraki adım, birlikte.</h2></div><span className="hidden rounded-full bg-[#d5e8da] p-2 sm:block"><MoveUpRight size={20} /></span></div>
          <div className="mt-5 grid grid-cols-3 gap-2 md:gap-3">
            {[['01','Doğru kitle','Kimi hedefliyoruz?'],['02','Güçlü mesaj','Ne anlatıyoruz?'],['03','Net ölçüm','Neyi izliyoruz?']].map(([n,title,subtitle])=><div key={n} className="rounded-xl border border-[#162b22]/10 bg-white/65 p-3 md:p-4"><p className="mb-2 font-mono text-[10px] text-[#748d7d]">/{n}</p><h3 className="text-xs font-semibold md:text-sm">{title}</h3><p className="mt-1 hidden text-[10px] text-[#7c8e81] sm:block">{subtitle}</p></div>)}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1.15fr_1fr]">
            <div className="relative overflow-hidden rounded-xl bg-[#183e2c] p-5 text-white">
              <p className="text-[9px] tracking-[0.15em] text-[#acd4ba]">KREATİF YÖN</p><h3 className="relative z-10 mt-3 text-2xl font-medium leading-tight tracking-tight md:text-3xl">Fark edil.<br />Bağ kur.<br /><span className="text-[#b8f1b5]">İz bırak.</span></h3>
              <div aria-hidden="true" className="absolute -bottom-12 -right-9 h-44 w-44 rounded-full border-[28px] border-[#b8f1b5]/20" /><ArrowUpRight className="absolute right-5 top-5 text-[#b8f1b5]" size={18} />
            </div>
            <div className="hidden rounded-xl border border-[#162b22]/10 bg-white/70 p-5 sm:block"><p className="mb-5 text-[9px] tracking-[0.15em] text-[#6a7e70]">KAMPANYA YOL HARİTASI</p>{['Hedefleri birlikte belirle','Mesajı ve kreatifi tasarla','Doğru kanallarda yayına al','Ölç, öğren ve geliştir'].map((text,i)=><div key={text} className="mb-4 flex items-center gap-3 text-[11px]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3eee6] text-[9px]">{i+1}</span>{text}</div>)}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#162b22]/10 px-5 py-3 text-[9px] text-[#75887a]"><span className="flex items-center gap-1.5"><Check size={11} /> Markanıza özel planlama</span><span>METAPHY GROWTH AGENCY</span></div>
    </div>
  );
}

export function AgencyScroll() {
  return <main className="min-h-screen overflow-x-clip bg-[#080e0b] pb-8 pt-24 text-[#eff6f0]">
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs"><span className="font-semibold tracking-tight">Metaphy <span className="font-normal text-white/45">Growth Agency</span></span><span className="hidden text-[10px] tracking-[0.16em] text-[#b8d4bf]/60 sm:block">STRATEJİ · KREATİF · PERFORMANS</span></header>
    <ContainerScroll titleComponent={<><p className="mb-5 text-[10px] tracking-[0.24em] text-[#b6d8bd]">BÜYÜK RESME BİRLİKTE BAKALIM</p><h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] md:text-6xl">Markanızın potansiyelini<br /><span className="text-[#b8f1b5]">büyümeye dönüştürelim.</span></h1><p className="mx-auto mt-6 max-w-xl px-4 text-sm leading-6 text-[#9bac9f]">Yaratıcı fikirleri doğru stratejiyle buluşturuyor, markanızın dijital yolculuğunu bir bütün olarak tasarlıyoruz.</p><p className="mt-6 inline-flex items-center gap-2 text-[10px] tracking-[0.14em] text-[#bed0c1]"><ArrowDown size={13} /> KEŞFETMEK İÇİN KAYDIR</p></>}><CampaignPreview /></ContainerScroll>
    <section className="relative mx-auto max-w-6xl px-6 pb-16" aria-labelledby="growth-title"><p className="mb-5 text-[10px] tracking-[0.2em] text-[#b6d8bd]">HER ADIM AYNI HEDEFE</p><h2 id="growth-title" className="max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">İyi bir kampanya, güçlü bir bütünün parçasıdır.</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{[
      {icon:Target,title:'Hedefi netleştiririz.',text:'Markanızı, müşterilerinizi ve iş hedeflerinizi anlayarak iletişiminizin yönünü belirleriz.'},
      {icon:Layers3,title:'Deneyimi tasarlarız.',text:'Reklam, içerik ve açılış sayfalarını aynı marka hikâyesinin parçaları olarak ele alırız.'},
      {icon:ChartNoAxesCombined,title:'Öğrenerek geliştiririz.',text:'Kampanya verilerini düzenli değerlendirir, testlerle mesajları ve medya planını iyileştiririz.'},
    ].map(({icon:Icon,title,text})=><article key={title} className="border-t border-white/15 pt-6"><Icon className="mb-6 text-[#b8f1b5]" size={23} /><h3 className="mb-3 text-lg font-medium">{title}</h3><p className="text-sm leading-7 text-[#9bac9f]">{text}</p></article>)}</div>
      <div className="mt-16 flex flex-col justify-between gap-6 rounded-2xl border border-[#b8f1b5]/20 bg-[#122319] p-7 sm:flex-row sm:items-center"><p className="text-xl tracking-tight">Bir sonraki adımınız için buradayız.</p><a href="/#hizmetler" className="inline-flex w-fit items-center gap-6 rounded-full bg-[#b8f1b5] px-6 py-3 text-sm font-medium text-[#163521] hover:bg-white">Hizmetlerimizi keşfedin <ArrowUpRight size={16} /></a></div>
    </section><footer className="mx-auto flex max-w-6xl justify-between gap-4 border-t border-white/10 px-6 pt-7 text-[10px] text-[#7b9382]"><span>Metaphy Growth Agency</span><span>Hayallerinizdeki reklam ajansı.</span></footer>
  </main>;
}
