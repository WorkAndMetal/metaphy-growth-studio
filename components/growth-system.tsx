"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk, Plus, Pause, Play } from "lucide-react";
import styles from "@/components/growth-system.module.css";

const stages = [
  { name: "Strateji", word: "Strateji", caption: "VERİYE DAYALI PLANLAMA", color: "#ff815b", title: "İş hedeflerinizle uyumlu marka stratejisi.", text: "Marka konumunuzu, hedef kitlenizi ve rekabet ortamını analiz ediyoruz. İletişim ve kampanya kararlarını belirlenen iş hedefleri doğrultusunda yapılandırıyoruz.", outputs: ["Marka konumlandırması", "Hedef kitle analizi", "İletişim yol haritası"], note: "Analiz → stratejik yön" },
  { name: "Kreatif", word: "Tasarım", caption: "TUTARLI MARKA İLETİŞİMİ", color: "#c5b5ff", title: "Marka kimliğinizi güçlendiren yaratıcı çözümler.", text: "Marka stratejinizi görsel tasarım, içerik ve kampanya konseptlerine dönüştürüyoruz. Her kanalda tutarlı bir kimlik ve hedef kitlenize uygun bir iletişim dili oluşturuyoruz.", outputs: ["Kampanya konsepti", "Görsel kimlik ve içerik", "Kanala özel uyarlamalar"], note: "Strateji → yaratıcı uygulama" },
  { name: "Performans", word: "Gelişim", caption: "ÖLÇÜM VE OPTİMİZASYON", color: "#c9ec9a", title: "Ölçülebilir hedefler, sistematik gelişim.", text: "Kampanyaları belirlenen hedefler doğrultusunda yönetiyor, sonuçları düzenli olarak analiz ediyoruz. Performans verilerini bütçe, içerik ve kanal optimizasyonuna dönüştürüyoruz.", outputs: ["Medya ve kanal planı", "Kreatif performans analizi", "Ölçüm ve optimizasyon"], note: "Ölçüm → sürekli gelişim" },
] as const;

const goals = [
  { name: "Marka bilinirliği", title: "Hedef kitlenizde güçlü bir marka konumu.", text: "Markanızın değer önerisini netleştiriyor, bilinirlik hedeflerinize uygun bir iletişim planı hazırlıyoruz. Lansman ve içerik çalışmalarını bütüncül bir yaklaşımla yönetiyoruz.", steps: ["Hedef kitle segmentlerini ve iletişim önceliklerini belirliyoruz.", "Markanızın görsel kimliğini ve iletişim dilini yapılandırıyoruz.", "Kanal ve içerik planını bilinirlik hedefleriyle eşleştiriyoruz."], output: "Konumlandırma + lansman stratejisi + içerik planı", question: "Markanız hedef kitlenizde nasıl konumlanmalı?" },
  { name: "Talep oluşturma", title: "Değer önerisinden dönüşüme uzanan planlama.", text: "Ürün ve hizmetlerinizin değerini müşteri ihtiyaçlarıyla ilişkilendiriyoruz. Reklam, içerik ve açılış sayfasını dönüşüm hedeflerinize göre birlikte tasarlıyoruz.", steps: ["Satın alma kararını etkileyen unsurları analiz ediyoruz.", "Mesaj ve kreatif alternatiflerini performans verileriyle değerlendiriyoruz.", "Reklam ve açılış sayfasında tutarlı bir kullanıcı deneyimi oluşturuyoruz."], output: "Değer önerisi + kampanya planı + dönüşüm yolculuğu", question: "Hangi müşteri ihtiyacı talep oluşturma stratejinize yön veriyor?" },
  { name: "Sürdürülebilir büyüme", title: "Veriye dayalı kararlarla kaynak verimliliği.", text: "Mevcut pazarlama çalışmalarınızın iş hedeflerine katkısını değerlendiriyoruz. Analiz sonuçları doğrultusunda öncelikleri belirliyor, kaynak kullanımını ve kampanya performansını optimize ediyoruz.", steps: ["Kanal ve içeriklerin performansını analiz ediyoruz.", "Öncelikli gelişim alanlarını ve ölçüm kriterlerini belirliyoruz.", "İyileştirme planını düzenli değerlendirmelerle güncelliyoruz."], output: "Kanal analizi + optimizasyon öncelikleri + gelişim planı", question: "Büyüme hedefleriniz için hangi alanlara öncelik verilmeli?" },
] as const;

const process = [
  { title: "Durum analizi", label: "ARAŞTIRMA & DEĞERLENDİRME", text: "İş hedeflerinizi, hedef kitlenizi ve rekabet ortamını değerlendiriyoruz. Mevcut marka iletişimini inceleyerek projenin kapsamını ve başarı kriterlerini belirliyoruz.", detail: "Kapsam: marka konumu, hedef kitle segmentleri, rekabet analizi, mevcut iletişim ve performans göstergeleri.", output: "Proje kapsamı ve hedefler" },
  { title: "Stratejik planlama", label: "STRATEJİ & KREATİF YÖN", text: "Analiz bulgularını iletişim stratejisine ve yaratıcı konsepte dönüştürüyoruz. Ana mesajı, içerik formatlarını ve kanal önceliklerini ortak hedefler doğrultusunda planlıyoruz.", detail: "Kapsam: değer önerisi, ana mesaj, yaratıcı konsept, içerik formatları ve yayın takvimi.", output: "Bütüncül iletişim planı" },
  { title: "Uygulama ve yayın", label: "ÜRETİM & KAMPANYA YÖNETİMİ", text: "Onaylanan strateji doğrultusunda içerikleri üretiyor ve kanallara uyarlıyoruz. Yayın öncesinde kullanıcı deneyimini, teknik gereklilikleri ve ölçüm altyapısını kontrol ediyoruz.", detail: "Kapsam: içerik üretimi, kanal uyarlamaları, bağlantı kontrolleri, ölçüm noktaları, onay süreci ve medya planı.", output: "Koordineli kampanya uygulaması" },
  { title: "Performans yönetimi", label: "RAPORLAMA & OPTİMİZASYON", text: "Kampanya sonuçlarını belirlenen göstergeler üzerinden değerlendiriyoruz. Düzenli raporlama ve analizlerle iyileştirme alanlarını belirliyor, uygulama planını güncelliyoruz.", detail: "Kapsam: hedef gerçekleşmeleri, kanal ve kreatif performansı, bütçe verimliliği ve optimizasyon öncelikleri.", output: "Veriye dayalı gelişim planı" },
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
          <span className={styles.edition}>STRATEJİK YAKLAŞIM. BÜTÜNCÜL İLETİŞİM.</span>
          <span className={styles.chapter}>03 / BÜYÜME SİSTEMİ</span>
        </header>

        <section className={styles.hero} aria-labelledby="growth-heading">
          <div className={styles.intro}>
            <p className={styles.eyebrow}><span /> BÜYÜMENİN BAĞLANTI NOKTASI</p>
            <h1 id="growth-heading">Güçlü fikir.<br />Net strateji.<br /><span>Kalıcı değer.</span></h1>
            <p className={styles.lead}>Strateji, kreatif ve performans.<br />Bütüncül bir yaklaşım. <em>Metaphy.</em></p>
            <a href="#buyume-sistemi" className={styles.explore}>Yaklaşımımızı inceleyin <ArrowDown size={16} /></a>
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
              <button type="button" className={styles.core} onClick={() => setActive((current) => (current + 1) % stages.length)} aria-label="Sonraki disiplini görüntüleyin" aria-controls="growth-detail"><Asterisk size={52} strokeWidth={1} /><span>BÜTÜNCÜL YAKLAŞIM</span><strong key={stage.word}>{stage.word}</strong><span>SONRAKİ DİSİPLİN ↗</span></button>
              {stages.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} aria-controls="growth-detail" onClick={() => setActive(index)} className={`${styles.orbitLabel} ${[styles.labelOne, styles.labelTwo, styles.labelThree][index]}`}>0{index + 1} / {item.name.toLocaleUpperCase("tr")}</button>)}
            </div>
            <div className={styles.artMeta}><span>DİSİPLİNLERİ İNCELEMEK İÇİN SEÇİN.</span><button type="button" className={styles.motionToggle} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={12} /> : <Pause size={12} />}{paused ? "Hareketi aç" : "Hareketi durdur"}</button></div>
          </div>
        </section>

        <section id="buyume-sistemi" className={styles.system} aria-labelledby="system-heading">
          <div className={styles.sectionHeading}><h2 id="system-heading">Üç uzmanlık alanı. <span>Ortak strateji.</span></h2><p>Uzmanlık alanlarımızı ve çalışma kapsamını inceleyin.</p></div>
          <div className={styles.selector} role="group" aria-label="Büyüme disiplinleri">
            {stages.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} aria-controls="growth-detail" onClick={() => setActive(index)} className={styles.stageButton}><span className={styles.stageNumber}>0{index + 1}</span><span>{item.name}</span><ArrowUpRight size={25} strokeWidth={1.2} /></button>)}
          </div>
          <div id="growth-detail" className={styles.detail} aria-live="polite" aria-atomic="true">
            <div className={styles.detailHeading}><p className={styles.eyebrow}>{stage.caption}</p><h3>{stage.title}</h3></div>
            <div className={styles.detailBody}><p>{stage.text}</p><ul>{stage.outputs.map((output) => <li key={output}><Plus size={13} />{output}</li>)}</ul></div>
            <div className={styles.loopNote}><span>0{active + 1} / 03</span><p>{stage.note}</p><span>ORTAK HEDEFLERE KATKI SAĞLAR ↗</span></div>
          </div>
        </section>

        <div className={styles.wordRibbon} aria-hidden="true"><div>{[0, 1].map((copy) => <span key={copy}>ANALİZ <Asterisk /> STRATEJİ <Asterisk /> UYGULAMA <Asterisk /> GELİŞİM <Asterisk /> </span>)}</div></div>

        <motion.section {...reveal} {...entrance} className={styles.goalSection} aria-labelledby="goal-heading">
          <div className={styles.editorialHeading}><p className={styles.eyebrow}>01 / İŞ HEDEFLERİNİZE ÖZEL YAKLAŞIM</p><h2 id="goal-heading">İş hedefleriniz,<br /><span>stratejik önceliğimiz.</span></h2><p>Markanızın öncelikli hedefini seçerek önerilen çalışma kapsamını ve stratejik yaklaşımımızı inceleyin.</p></div>
          <div className={styles.goalChoices} role="group" aria-label="Markanızın hedefi">{goals.map((item, index) => <button type="button" key={item.name} aria-pressed={goal === index} aria-controls="goal-result" onClick={() => setGoal(index)}><span>0{index + 1}</span>{item.name}<ArrowUpRight size={18} /></button>)}</div>
          <div id="goal-result" aria-live="polite" aria-atomic="true" className={styles.goalResult}>
            <div className={styles.goalQuestion}><span>STRATEJİK ODAK</span><Asterisk size={54} strokeWidth={1} /><p key={selectedGoal.question}>{selectedGoal.question}</p><span>NET HEDEFLER. YAPILANDIRILMIŞ PLANLAMA.</span></div>
            <div className={styles.goalPlan} key={goal}><h3>{selectedGoal.title}</h3><p>{selectedGoal.text}</p><ol>{selectedGoal.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><div className={styles.deliverable}><span>ÖNERİLEN ÇALIŞMA KAPSAMI</span><p>{selectedGoal.output}</p></div></div>
          </div>
        </motion.section>

        <section className={styles.processSection} aria-labelledby="process-heading">
          <div className={styles.processIntro}><p className={styles.eyebrow}>02 / ÇALIŞMA METODOLOJİMİZ</p><h2 id="process-heading">Planlı uygulama.<br /><span>Sürekli gelişim.</span></h2><p>Analizden optimizasyona uzanan bütüncül süreçte her aşamayı tanımlı hedefler, somut çıktılar ve düzenli değerlendirmelerle yönetiyoruz.</p><div className={styles.cycleArt} aria-hidden="true"><Asterisk /><span>SÜREKLİ<br />GELİŞİM</span></div></div>
          <div className={styles.processSteps}>{process.map((step, index) => <motion.article {...reveal} {...entrance} key={step.title} className={styles.processStep}><span className={styles.processNumber}>0{index + 1}</span><div><p className={styles.eyebrow}>{step.label}</p><h3>{step.title}</h3><p>{step.text}</p><details><summary>Çalışma kapsamını inceleyin <Plus size={15} /></summary><p>{step.detail}</p></details><span className={styles.stepOutput}>↗ {step.output}</span></div></motion.article>)}</div>
        </section>

        <motion.section {...reveal} {...entrance} className={styles.principles} aria-labelledby="principles-heading"><p className={styles.eyebrow}>03 / İŞ BİRLİĞİ İLKELERİMİZ</p><h2 id="principles-heading">Güçlü iş birliği.<br /><span>Ortak değer.</span></h2><div>{[
          ["Şeffaf iletişim", "Proje kapsamını, kararları ve öncelikleri açık biçimde paylaşırız. Düzenli bilgilendirme ve raporlamayla sürecin her aşamasında görünürlük sağlarız."],
          ["Bütüncül yönetim", "Strateji, tasarım ve medya çalışmalarını ortak hedefler doğrultusunda koordine ederiz. Tüm temas noktalarında marka tutarlılığını gözetiriz."],
          ["Sürekli iyileştirme", "Performans verilerini ve paydaş geri bildirimlerini düzenli olarak değerlendiririz. Bulguları somut iyileştirme adımlarına ve güncellenmiş uygulama planlarına dönüştürürüz."],
        ].map(([title, text], index) => <article key={title}><span>0{index + 1} /</span><h3>{title}</h3><p>{text}</p></article>)}</div></motion.section>

        <section className={styles.closing} aria-labelledby="together-heading"><Asterisk className={styles.closingMark} strokeWidth={1} /><div><p className={styles.eyebrow}>MARKANIZ İÇİN STRATEJİK İŞ ORTAKLIĞI</p><h2 id="together-heading">Büyümeye odaklı iş birliği.</h2></div><Link href="/#hizmetler" className={styles.cta}>Hizmetlerimizi inceleyin <ArrowUpRight size={20} /></Link></section>
        <footer className={styles.footer}><span>Metaphy Growth Agency</span><span>Strateji, yaratıcılık ve performans odaklı iletişim.</span><Link href="/bolum-4">Sıradaki bölüm <ArrowUpRight size={14} /></Link></footer>
      </div>
    </main>
  );
}
