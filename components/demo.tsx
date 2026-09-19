"use client";

import { useState, useEffect } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: "https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1",
    poster:
      "https://cdn.21st.dev/assets/localized/5bb1be92440e920def3eb36ad5a610d609240616cd8b11c0effe6b92bcafe06e.jpg",
    background:
      "https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS",
    title: "Metaphy Growth Studio",
    date: "Dijital Reklamcılık",
    scrollToExpand: "Hayallerinizdeki reklam ajansı.",
  },
  image: {
    src: "/merkez-fotograf.jpeg",
    background:
      "/deneme.jpeg",
    title: "Metaphy Growth Studio",
    date: "Dijital Reklamcılık",
    scrollToExpand: "Hayallerinizdeki reklam ajansı.",
  },
};

const services = [
  { number: "01", title: "Performans pazarlaması", text: "Meta ve Google reklamlarını iş hedeflerinize göre planlıyoruz. Doğru kitleyi, doğru mesajı ve doğru kanalı bulmak için kampanyaları test ediyor, bütçenizi veriye dayalı kararlarla yönetiyoruz.", tags: "META ADS / GOOGLE ADS / YENİDEN PAZARLAMA" },
  { number: "02", title: "Marka stratejisi & kreatif", text: "Markanızın neden tercih edilmesi gerektiğini güçlü bir hikâyeye dönüştürüyoruz. Konumlandırmadan reklam metnine, görsel tasarımdan video içeriklere kadar tutarlı bir marka deneyimi oluşturuyoruz.", tags: "KONUMLANDIRMA / TASARIM / VİDEO" },
  { number: "03", title: "Sosyal medya & içerik", text: "Markanızın sesini hedef kitlenizin dünyasıyla buluşturuyoruz. İçerik stratejisi, yayın planı ve topluluk iletişimini bir bütün olarak ele alıyor; her paylaşımı anlamlı bir temas noktasına dönüştürüyoruz.", tags: "İÇERİK STRATEJİSİ / SOSYAL MEDYA / TOPLULUK" },
  { number: "04", title: "Dönüşüm & analitik", text: "Reklam tıklamasından sonraki deneyimi de tasarlıyoruz. Açılış sayfaları, ölçüm altyapısı ve dönüşüm analizleriyle müşteri yolculuğundaki fırsatları belirliyor, gelişimi görünür hale getiriyoruz.", tags: "AÇILIŞ SAYFALARI / ÖLÇÜMLEME / OPTİMİZASYON" },
];

const MediaContent = () => (
  <main className="agency-content mx-auto w-full max-w-6xl">
    <section className="agency-intro" aria-labelledby="agency-title">
      <p className="agency-eyebrow">METAPHY GROWTH STUDIO — STRATEJİ, KREATİF, PERFORMANS</p>
      <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <h2 id="agency-title" className="agency-heading">Büyük fikirler.<br /><span className="text-blue-200">Ölçülebilir büyüme.</span></h2>
        <div className="space-y-5 text-lg leading-relaxed text-slate-300">
          <p>Markanızın potansiyelini açığa çıkarmak için buradayız. Yaratıcı düşünceyi veriyle birleştiriyor, dijitalde kurduğunuz her bağı büyüme yolculuğunuzun bir parçası haline getiriyoruz.</p>
          <p>Metaphy Growth Studio olarak stratejiden uygulamaya kadar aynı hedefe odaklanıyoruz: markanız için anlamlı, sürdürülebilir ve ölçülebilir değer yaratmak.</p>
          <a href="#hizmetler" className="agency-link">Neler yapıyoruz? <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>

    <section id="hizmetler" className="agency-section" aria-labelledby="services-title">
      <p className="agency-eyebrow">UZMANLIK ALANLARIMIZ</p>
      <h2 id="services-title" className="agency-subheading">Büyümenin her adımında.</h2>
      <div className="mt-12 grid gap-x-12 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.number} className="agency-service">
            <span className="font-mono text-sm text-blue-200/60">/{service.number}</span>
            <h3 className="mb-4 mt-6 text-2xl font-semibold tracking-tight">{service.title}</h3>
            <p className="leading-7 text-slate-400">{service.text}</p>
            <p className="mt-7 text-[10px] leading-5 tracking-[0.14em] text-blue-200">{service.tags}</p>
          </article>
        ))}
      </div>
    </section>

    <section id="yaklasim" className="agency-section" aria-labelledby="process-title">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="agency-eyebrow">ÇALIŞMA YAKLAŞIMIMIZ</p><h2 id="process-title" className="agency-subheading">İyi sonuçlar, iyi sorularla başlar.</h2></div>
        <p className="max-w-xs leading-7 text-slate-400">Hazır reçeteler yerine markanızın ihtiyaçlarından yola çıkan bir yol haritası.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {[
          ["01 — KEŞİF", "Önce sizi tanıyoruz.", "İşinizi, hedef kitlenizi ve rekabet alanınızı inceliyoruz. Başarıyı sizin için tanımlayan hedefleri ve ölçüm kriterlerini birlikte netleştiriyoruz."],
          ["02 — TASARIM & YAYIN", "Fikri harekete geçiriyoruz.", "Stratejiye uygun kreatifleri ve kampanyaları hazırlıyoruz. Mesaj, kanal ve kullanıcı deneyimini aynı hedef etrafında buluşturuyoruz."],
          ["03 — ANALİZ & GELİŞİM", "Öğrenerek büyüyoruz.", "Sonuçları düzenli olarak değerlendiriyoruz. Testlerden öğrendiklerimizle kampanyaları geliştiriyor, bir sonraki adımı şeffaf raporlarla paylaşıyoruz."],
        ].map(([label, title, text]) => <article key={label} className="agency-step"><p className="text-xs tracking-widest text-blue-200">{label}</p><h3 className="mb-4 mt-8 text-xl font-semibold">{title}</h3><p className="leading-7 text-slate-400">{text}</p></article>)}
      </div>
    </section>

    <section className="agency-principle">
      <p className="agency-eyebrow">BİRLİKTE ÇALIŞMAK</p>
      <h2 className="agency-subheading max-w-3xl">Markanıza, kendi markamız kadar özen gösteriyoruz.</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <div><h3 className="mb-3 font-semibold">Şeffaf iletişim</h3><p className="leading-7 text-slate-400">Neyi, neden yaptığımızı bilirsiniz. Hedefleri, bütçe kararlarını ve sonuçları açıkça paylaşırız.</p></div>
        <div><h3 className="mb-3 font-semibold">Bütüncül bakış</h3><p className="leading-7 text-slate-400">Kreatif, medya ve veriyi birlikte değerlendiririz. Her kanalın marka deneyimine katkısını gözetiriz.</p></div>
        <div><h3 className="mb-3 font-semibold">Sürekli gelişim</h3><p className="leading-7 text-slate-400">Varsayımları test eder, öğrendiklerimizi uygularız. Her kampanyayı bir sonraki adımı iyileştiren bir fırsat olarak görürüz.</p></div>
      </div>
    </section>

    <section className="agency-closing" aria-labelledby="closing-title">
      <p className="agency-eyebrow">BİR SONRAKİ ADIM</p>
      <h2 id="closing-title" className="agency-heading">Markanızın geleceğini<br /><span className="text-blue-200">birlikte büyütelim.</span></h2>
      <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-slate-400">Bir hedefiniz, yeni bir fikriniz ya da çözmek istediğiniz bir büyüme sorununuz var. Biz de onu birlikte ele almak için buradayız.</p>
      <p className="mt-10 text-sm tracking-wide text-blue-100">Metaphy Growth Studio · Hayallerinizdeki reklam ajansı.</p>
    </section>
    <footer className="flex flex-col justify-between gap-4 border-t border-white/10 py-8 text-xs text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} Metaphy Growth Studio</span><span>Stratejiyle düşünür. Yaratıcılıkla fark yaratır.</span></footer>
  </main>
);

export const VideoExpansionTextBlend = () => {
  const mediaType = "video";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = () => {
  const mediaType = "image";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = () => {
  const mediaType = "video";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = () => {
  const mediaType = "image";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent />
      </ScrollExpandMedia>
    </div>
  );
};

function Demo() {
  const [mediaType, setMediaType] = useState("video");
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className="min-h-screen">
      <div className="fixed top-[4.75rem] right-4 z-50 flex gap-2 sm:top-4">
        <button
          onClick={() => setMediaType("video")}
          className={`px-4 py-2 rounded-lg ${
            mediaType === "video"
              ? "bg-white text-black"
              : "bg-black/50 text-white border border-white/30"
          }`}
        >
          Video
        </button>

        <button
          onClick={() => setMediaType("image")}
          className={`px-4 py-2 rounded-lg ${
            mediaType === "image"
              ? "bg-white text-black"
              : "bg-black/50 text-white border border-white/30"
          }`}
        >
          Görsel
        </button>
      </div>

      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType as "video" | "image"}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === "video" ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent />
      </ScrollExpandMedia>
    </div>
  );
}

export default Demo;
