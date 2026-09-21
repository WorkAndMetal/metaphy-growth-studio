"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk, Plus, Pause, Play } from "lucide-react";
import styles from "@/components/growth-system.module.css";

const stages = [
  { name: "Strateji", word: "Yön bul.", caption: "DOĞRU SORUYLA BAŞLAR", color: "#ff815b", title: "Önce, büyük resmi görüyoruz.", text: "Markanızı, hedef kitlenizi ve rekabeti birlikte okuyoruz. Her yaratıcı kararın arkasına net bir amaç, her kampanyanın önüne doğru bir hedef koyuyoruz.", outputs: ["Marka konumlandırması", "Hedef kitle içgörüleri", "İletişim yol haritası"], note: "İçgörü → net bir yön" },
  { name: "Kreatif", word: "İz bırak.", caption: "FİKRİN GÖRÜNÜR HALİ", color: "#c5b5ff", title: "Görülmenin ötesinde, hatırlanın.", text: "Stratejiyi bir hissi, bir fikri ve bir hareketi tetikleyen içeriklere dönüştürüyoruz. Markanızın sesini tasarım, kelimeler ve hareketle görünür kılıyoruz.", outputs: ["Kampanya fikri", "Görsel dünya ve içerik", "Kanala özel uyarlamalar"], note: "Fikir → güçlü bir ifade" },
  { name: "Performans", word: "İleri git.", caption: "HER ADIMDA YENİ BİR İÇGÖRÜ", color: "#c9ec9a", title: "Yayınlarız. Öğreniriz. Geliştiririz.", text: "Fikirleri doğru kitleyle buluşturuyor, sonuçları iş hedeflerinizle birlikte değerlendiriyoruz. Testlerden öğrendiklerimizi bir sonraki yaratıcı karara taşıyoruz.", outputs: ["Medya ve kanal planı", "Kreatif testleri", "Ölçüm ve optimizasyon"], note: "Öğrenme → bir sonraki adım" },
] as const;

const goals = [
  { name: "Markamı duyurmak", title: "Önce dikkat. Sonra güçlü bir bağ.", text: "Yeni bir marka ya da yeni bir hikâye. Sizi doğru insanların dünyasına, hatırlanmaya değer bir fikirle dahil ederiz.", steps: ["Kiminle konuştuğumuzu netleştiririz.", "Markaya ait bir görsel ve sözel dünya kurarız.", "Mesajı doğru temas noktalarına taşırız."], output: "Konumlandırma + lansman fikri + içerik planı", question: "İnsanlar markanızı hangi fikirle hatırlasın?" },
  { name: "Talebi artırmak", title: "İlgiyi, harekete geçiren bir nedene dönüştür.", text: "Ürün ya da hizmetinizin değerini görünür kılarız. İlk karşılaşmadan karar anına kadar mesajı, kreatifi ve deneyimi birlikte ele alırız.", steps: ["Satın alma kararındaki engelleri keşfederiz.", "Değer önerisini farklı kreatiflerle test ederiz.", "Reklam ve açılış sayfasını aynı hikâyede buluştururuz."], output: "Değer önerisi + kreatif test planı + dönüşüm yolculuğu", question: "Müşterinizin bir sonraki adımı atmasını ne kolaylaştırır?" },
  { name: "Daha iyi büyümek", title: "Çalışanı anla. Potansiyeli büyüt.", text: "Mevcut çalışmalarınıza birlikte bakarız. Veriyi yalnızca raporlamak için değil, daha iyi bir sonraki kararı vermek için kullanırız.", steps: ["Kanal ve içeriklerin katkısını değerlendiririz.", "Öncelikli gelişim alanlarını belirleriz.", "Öğrendiklerimizi yeni bir test döngüsüne taşırız."], output: "Kanal değerlendirmesi + test öncelikleri + gelişim planı", question: "Bugünün sonuçları yarının hangi kararını değiştirmeli?" },
] as const;

const process = [
  { title: "Dinleriz.", label: "KEŞİF & İÇGÖRÜ", text: "Hazır cevaplarla değil, doğru sorularla başlarız. İş hedefinizi, müşterilerinizi ve markanızın bugün durduğu yeri birlikte anlamlandırırız.", detail: "Masadaki konular: marka hikâyesi, hedef kitle, rakipler, mevcut iletişim ve başarı tanımı.", output: "Ortak bir brief" },
  { title: "Birleştiririz.", label: "STRATEJİ & FİKİR", text: "İçgörüyü yaratıcı bir çıkış noktasına dönüştürürüz. Mesaj, görsel dünya ve kanal seçimleri aynı amaca hizmet eder.", detail: "Birlikte netleştirdiklerimiz: ana mesaj, yaratıcı yön, içerik formatları ve yayın öncelikleri.", output: "Tek bir yaratıcı yön" },
  { title: "Harekete geçiririz.", label: "ÜRETİM & YAYIN", text: "Fikri bulunduğu kanala göre tasarlarız. İçeriği, reklamı ve kullanıcı deneyimini yayından önce bir bütün olarak kontrol ederiz.", detail: "Yayın öncesi: içerik uyarlamaları, bağlantılar, ölçüm noktaları, onaylar ve medya planı.", output: "Birbiriyle çalışan temas noktaları" },
  { title: "Birlikte geliştiririz.", label: "ÖLÇÜM & ÖĞRENME", text: "Yayın bir bitiş çizgisi değil, öğrenmenin başlangıcıdır. Sonuçları konuşur, yeni sorular sorar ve bir sonraki adımı birlikte belirleriz.", detail: "Değerlendirme masasında: hedefe katkı, yaratıcı öğrenimler, iyileştirme fırsatları ve sıradaki testler.", output: "Bir sonraki adım için netlik" },
] as const;

export function GrowthSystem() {
  const [active, setActive] = useState(0);
  const [goal, setGoal] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const stage = stages[active];
  const selectedGoal = goals[goal];
  const reveal = { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 } };
  const entrance = reducedMotion || paused ? {} : { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.65 } };

  return (
    <main className={styles.page} data-paused={paused} style={{ "--signal": stage.color } as CSSProperties}>
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

          <div className={styles.artwork}>
            <div className={styles.artMeta}><span>METAPHY / CONNECTED THINKING</span><Plus size={15} /></div>
            <div className={styles.orbitScene} data-stage={active}>
              <div className={styles.halo} />
              <svg aria-hidden="true" className={styles.orbits} viewBox="0 0 600 600" fill="none">
                <circle cx="300" cy="300" r="244" stroke="currentColor" strokeOpacity=".15" strokeDasharray="2 9" />
                {[0, 60, 120].map((angle, index) => <g key={angle} transform={`rotate(${angle} 300 300)`} opacity={active === index ? 1 : 0.32}><ellipse cx="300" cy="300" rx="242" ry="109" stroke="currentColor" strokeWidth={active === index ? 1.8 : 1} /><circle cx="542" cy="300" r={active === index ? 7 : 4} fill="currentColor" /></g>)}
                <path d="M290 30h20M300 20v20M290 570h20M300 560v20" stroke="currentColor" strokeOpacity=".45" />
              </svg>
              <button type="button" className={styles.core} onClick={() => setActive((current) => (current + 1) % stages.length)} aria-label="Sonraki disiplini keşfet" aria-controls="growth-detail"><Asterisk size={52} strokeWidth={1} /><span>HER ŞEY BAĞLANTILI.</span><strong key={stage.word}>{stage.word}</strong><span>SONRAKİ DİSİPLİN ↗</span></button>
              {stages.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} aria-controls="growth-detail" onClick={() => setActive(index)} className={`${styles.orbitLabel} ${[styles.labelOne, styles.labelTwo, styles.labelThree][index]}`}>0{index + 1} / {item.name.toLocaleUpperCase("tr")}</button>)}
            </div>
            <div className={styles.artMeta}><span>MERKEZE DOKUN. BAĞLANTIYI DEĞİŞTİR.</span><button type="button" className={styles.motionToggle} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={12} /> : <Pause size={12} />}{paused ? "Hareketi aç" : "Hareketi durdur"}</button></div>
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

        <div className={styles.wordRibbon} aria-hidden="true"><div>{[0, 1].map((copy) => <span key={copy}>DÜŞÜN <Asterisk /> TASARLA <Asterisk /> DENE <Asterisk /> GELİŞTİR <Asterisk /> </span>)}</div></div>

        <motion.section {...reveal} {...entrance} className={styles.goalSection} aria-labelledby="goal-heading">
          <div className={styles.editorialHeading}><p className={styles.eyebrow}>01 / SİZ NEREYE GİTMEK İSTİYORSUNUZ?</p><h2 id="goal-heading">Başlangıç noktamız,<br /><span>sizin hedefiniz.</span></h2><p>Her markanın yolu farklı. Bugün sizin için en önemli olanı seçin; ilk adımı birlikte düşünelim.</p></div>
          <div className={styles.goalChoices} role="group" aria-label="Markanızın hedefi">{goals.map((item, index) => <button type="button" key={item.name} aria-pressed={goal === index} aria-controls="goal-result" onClick={() => setGoal(index)}><span>0{index + 1}</span>{item.name}<ArrowUpRight size={18} /></button>)}</div>
          <div id="goal-result" aria-live="polite" aria-atomic="true" className={styles.goalResult}>
            <div className={styles.goalQuestion}><span>İLK SORUMUZ</span><Asterisk size={54} strokeWidth={1} /><p key={selectedGoal.question}>{selectedGoal.question}</p><span>HER İYİ FİKRİN BİR BAŞLANGIÇ NOKTASI VAR.</span></div>
            <div className={styles.goalPlan} key={goal}><h3>{selectedGoal.title}</h3><p>{selectedGoal.text}</p><ol>{selectedGoal.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><div className={styles.deliverable}><span>BİRLİKTE ŞEKİLLENDİRECEĞİMİZ</span><p>{selectedGoal.output}</p></div></div>
          </div>
        </motion.section>

        <section className={styles.processSection} aria-labelledby="process-heading">
          <div className={styles.processIntro}><p className={styles.eyebrow}>02 / FİKİRDEN ETKİYE</p><h2 id="process-heading">Bir çizgi değil,<br /><span>bir döngü.</span></h2><p>Her aşama bir sonrakini besler. Her öğrenim, başladığımız yere yeni bir bakış açısı getirir.</p><div className={styles.cycleArt} aria-hidden="true"><Asterisk /><span>İYİLEŞMEYE<br />DEVAM.</span></div></div>
          <div className={styles.processSteps}>{process.map((step, index) => <motion.article {...reveal} {...entrance} key={step.title} className={styles.processStep}><span className={styles.processNumber}>0{index + 1}</span><div><p className={styles.eyebrow}>{step.label}</p><h3>{step.title}</h3><p>{step.text}</p><details><summary>Bu aşamada neler var? <Plus size={15} /></summary><p>{step.detail}</p></details><span className={styles.stepOutput}>↗ {step.output}</span></div></motion.article>)}</div>
        </section>

        <motion.section {...reveal} {...entrance} className={styles.principles} aria-labelledby="principles-heading"><p className={styles.eyebrow}>03 / AYNI MASADA</p><h2 id="principles-heading">İyi iş, iyi bir<br /><span>birliktelikten çıkar.</span></h2><div>{[
          ["Açık iletişim.", "Neyi neden yaptığımızı birlikte konuşuruz. Kararlar, öncelikler ve öğrenimler aynı masada görünür olur."],
          ["Bir bütün olarak.", "Strateji başka, tasarım başka, reklam başka bir hikâye anlatmaz. Her temas noktasında aynı markayı hissettiririz."],
          ["Merak hiç bitmez.", "İlk fikre tutunmak yerine daha iyisini ararız. Test eder, dinler ve öğrendiklerimizle yeniden üretiriz."],
        ].map(([title, text], index) => <article key={title}><span>0{index + 1} /</span><h3>{title}</h3><p>{text}</p></article>)}</div></motion.section>

        <section className={styles.closing} aria-labelledby="together-heading"><Asterisk className={styles.closingMark} strokeWidth={1} /><div><p className={styles.eyebrow}>SİZİN MARKANIZ. ORTAK HEDEFİMİZ.</p><h2 id="together-heading">Birlikte, daha ileri.</h2></div><Link href="/#hizmetler" className={styles.cta}>Neler yapabiliriz? <ArrowUpRight size={20} /></Link></section>
        <footer className={styles.footer}><span>Metaphy Growth Agency</span><span>Stratejiyle düşünür. Yaratıcılıkla fark yaratır.</span><Link href="/bolum-4">Sıradaki bölüm <ArrowUpRight size={14} /></Link></footer>
      </div>
    </main>
  );
}
