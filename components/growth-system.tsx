"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk, Plus } from "lucide-react";
import styles from "@/components/growth-system.module.css";

const stages = [
  { name: "Strateji", word: "Yön bul.", caption: "DOĞRU SORUYLA BAŞLAR", color: "#ff815b", title: "Önce, büyük resmi görüyoruz.", text: "Markanızı, hedef kitlenizi ve rekabeti birlikte okuyoruz. Her yaratıcı kararın arkasına net bir amaç, her kampanyanın önüne doğru bir hedef koyuyoruz.", outputs: ["Marka konumlandırması", "Hedef kitle içgörüleri", "İletişim yol haritası"], note: "İçgörü → net bir yön" },
  { name: "Kreatif", word: "İz bırak.", caption: "FİKRİN GÖRÜNÜR HALİ", color: "#c5b5ff", title: "Görülmenin ötesinde, hatırlanın.", text: "Stratejiyi bir hissi, bir fikri ve bir hareketi tetikleyen içeriklere dönüştürüyoruz. Markanızın sesini tasarım, kelimeler ve hareketle görünür kılıyoruz.", outputs: ["Kampanya fikri", "Görsel dünya ve içerik", "Kanala özel uyarlamalar"], note: "Fikir → güçlü bir ifade" },
  { name: "Performans", word: "İleri git.", caption: "HER ADIMDA YENİ BİR İÇGÖRÜ", color: "#c9ec9a", title: "Yayınlarız. Öğreniriz. Geliştiririz.", text: "Fikirleri doğru kitleyle buluşturuyor, sonuçları iş hedeflerinizle birlikte değerlendiriyoruz. Testlerden öğrendiklerimizi bir sonraki yaratıcı karara taşıyoruz.", outputs: ["Medya ve kanal planı", "Kreatif testleri", "Ölçüm ve optimizasyon"], note: "Öğrenme → bir sonraki adım" },
] as const;

export function GrowthSystem() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <main className={styles.page} style={{ "--signal": stage.color } as CSSProperties}>
      <div className={styles.shell}>
        <header className={styles.masthead}>
          <Link href="/" className={styles.brand} aria-label="Metaphy Growth Agency ana sayfa"><Asterisk size={29} strokeWidth={1.5} /><span>metaphy<span className={styles.brandSub}>growth agency</span></span></Link>
          <span className={styles.edition}>BAĞIMSIZ FİKİRLER. ORTAK HEDEFLER.</span>
          <span className={styles.chapter}>03 / BÜYÜME SİSTEMİ</span>
        </header>

        <section className={styles.hero} aria-labelledby="growth-heading">
          <div className={styles.intro}>
            <p className={styles.eyebrow}><span /> BÜYÜMENİN BAĞLANTI NOKTASI</p>
            <h1 id="growth-heading">İyi fikir.<br />Doğru yön.<br /><span>Gerçek etki.</span></h1>
            <p className={styles.lead}>Strateji, kreatif ve performans.<br />Ayrı ayrı güçlü. Birlikte <em>Metaphy.</em></p>
            <a href="#buyume-sistemi" className={styles.explore}>Bağlantıyı keşfet <ArrowDown size={16} /></a>
          </div>

          <div className={styles.artwork} aria-hidden="true">
            <div className={styles.artMeta}><span>METAPHY / CONNECTED THINKING</span><Plus size={15} /></div>
            <div className={styles.orbitScene} data-stage={active}>
              <div className={styles.halo} />
              <svg className={styles.orbits} viewBox="0 0 600 600" fill="none">
                <circle cx="300" cy="300" r="244" stroke="currentColor" strokeOpacity=".15" strokeDasharray="2 9" />
                {[0, 60, 120].map((angle, index) => <g key={angle} transform={`rotate(${angle} 300 300)`} opacity={active === index ? 1 : 0.32}><ellipse cx="300" cy="300" rx="242" ry="109" stroke="currentColor" strokeWidth={active === index ? 1.8 : 1} /><circle cx="542" cy="300" r={active === index ? 7 : 4} fill="currentColor" /></g>)}
                <path d="M290 30h20M300 20v20M290 570h20M300 560v20" stroke="currentColor" strokeOpacity=".45" />
              </svg>
              <div className={styles.core}><Asterisk size={52} strokeWidth={1} /><span>HER ŞEY BAĞLANTILI.</span><strong key={stage.word}>{stage.word}</strong><span>METAPHY GROWTH AGENCY</span></div>
              <span className={`${styles.orbitLabel} ${styles.labelOne}`}>01 / STRATEJİ</span>
              <span className={`${styles.orbitLabel} ${styles.labelTwo}`}>02 / KREATİF</span>
              <span className={`${styles.orbitLabel} ${styles.labelThree}`}>03 / PERFORMANS</span>
            </div>
            <div className={styles.artMeta}><span>ÜÇ DİSİPLİN. TEK BÜYÜME ODAĞI.</span><span>↗</span></div>
          </div>
        </section>

        <section id="buyume-sistemi" className={styles.system} aria-labelledby="system-heading">
          <div className={styles.sectionHeading}><h2 id="system-heading">Parçalar değişir. <span>Bağlantı kalır.</span></h2><p>Bir disiplin seçin, yaklaşımımızı keşfedin.</p></div>
          <div className={styles.selector} role="group" aria-label="Büyüme disiplinleri">
            {stages.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} aria-controls="growth-detail" onClick={() => setActive(index)} className={styles.stageButton}><span className={styles.stageNumber}>0{index + 1}</span><span>{item.name}</span><ArrowUpRight size={25} strokeWidth={1.2} /></button>)}
          </div>
          <div id="growth-detail" className={styles.detail} aria-live="polite" aria-atomic="true">
            <div className={styles.detailHeading}><p className={styles.eyebrow}>{stage.caption}</p><h3>{stage.title}</h3></div>
            <div className={styles.detailBody}><p>{stage.text}</p><ul>{stage.outputs.map((output) => <li key={output}><Plus size={13} />{output}</li>)}</ul></div>
            <div className={styles.loopNote}><span>0{active + 1} / 03</span><p>{stage.note}</p><span>BİR SONRAKİ FİKRE BAĞLANIR ↗</span></div>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="together-heading"><Asterisk className={styles.closingMark} strokeWidth={1} /><div><p className={styles.eyebrow}>SİZİN MARKANIZ. ORTAK HEDEFİMİZ.</p><h2 id="together-heading">Birlikte, daha ileri.</h2></div><Link href="/#hizmetler" className={styles.cta}>Neler yapabiliriz? <ArrowUpRight size={20} /></Link></section>
        <footer className={styles.footer}><span>Metaphy Growth Agency</span><span>Stratejiyle düşünür. Yaratıcılıkla fark yaratır.</span><Link href="/bolum-4">Sıradaki bölüm <ArrowUpRight size={14} /></Link></footer>
      </div>
    </main>
  );
}
