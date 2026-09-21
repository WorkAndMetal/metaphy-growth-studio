# Metaphy Growth Agency

## Çalıştırma

```sh
npm install
npm run dev
```

Önizleme: http://127.0.0.1:3001

Video / Image düğmeleriyle medya değiştir; tekerlek veya dokunmatik kaydırmayla medyayı genişlet.

## Yapı

- `components/ui/scroll-expansion-hero.tsx`: verilen ana bileşen.
- `components/demo.tsx`: verilen demo ve dört varyant.
- `app/globals.css`: Tailwind ve genel stiller.
- `components.json`: shadcn ayarları.
- `lib/utils.ts`: shadcn uyumlu cn yardımcısı.

`@/components/ui` ortak UI bileşenlerinin standart yoludur; shadcn tarafından eklenen bileşenlerin import yollarını tutarlı tutar. Next.js, TypeScript ve Tailwind kuruludur; ek başlangıç adımı gerekmez. Sonradan shadcn bileşeni eklemek için `npx shadcn@latest add button` kullanılabilir.

Kaynak prompttaki görünüm korunmuştur. Yerel DOM olay tipleri düzeltilmiş, dokunma başlangıcındaki sıfır koordinatı desteklenmiş, iframe başlığı eklenmiş ve medya geçişindeki durum sıfırlaması güvenilir hale getirilmiştir. Harici medya dosyaları internet bağlantısı gerektirir.

## Kontrol

```sh
npm run typecheck
npm run build
```

## 2. Bölüm

Üst menüden `/bolum-2` adresindeki scroll-locked video hero açılır. Tekerlek/dokunma hareketi videoyu ileri ve geri sarar. Kaynak bileşenin kilitli ekran davranışı korunmuştur; 1. Bölüm bağlantısı ilk sayfaya döner ve kaydırma kilidini kaldırır. Bileşen `components/ui/scroll-locked-video-hero.tsx` dosyasındadır.

## Bölüm 2 — kaydırma performansı

Video `public/media/metro-scrub.mp4` dosyasından sunulur: 1280×720, 30 fps, H.264, her kare anahtar kare, sessiz, faststart. Kaynak 24 fps olduğundan 30 fps dönüşümü yeni hareket kareleri üretmez. Bağımsız kareler özellikle geri sarmada önceki kareleri çözme ihtiyacını kaldırır. Çözünürlük, çözümleme yükünü azaltmak için 1080p’den 720p’ye düşürülmüştür.

Animasyon yalnızca hareket sırasında çalışır; sarma istekleri karelere yuvarlanır, saniyede en fazla 30 kez gönderilir ve aynı anda tek istek işlenir. Metinlerde animasyonlu bulanıklık yerine opacity/transform kullanılır. Bölümden çıkınca olay dinleyicileri kaldırılır ve sayfa kilidi eski durumuna döner.

Kaynak: https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4

Yeniden üretim (FFmpeg):

```sh
ffmpeg -i source.mp4 -an -vf 'scale=1280:-2,fps=30' -c:v libx264 -preset fast -crf 21 -g 1 -keyint_min 1 -bf 0 -pix_fmt yuv420p -movflags +faststart public/media/metro-scrub.mp4
```

## 3. Bölüm — büyümenin bağlantı noktası

`/bolum-3`, strateji, kreatif ve performansı bir araya getiren özgün bir etkileşimli sayfadır. `components/growth-system.tsx` içindeki üç seçim düğmesi yörünge çiziminin rengini, merkez mesajını ve yaklaşım açıklamasını günceller. Düğmeler klavye ile kullanılabilir; açıklamalar `aria-live` ile duyurulur. `components/growth-system.module.css` mobil yerleşimi ve azaltılmış hareket tercihini kapsar. SVG çizim yereldir; ek paket, harici medya veya kaydırma kilidi kullanılmaz.

Yörünge merkezi ve etiketleri disiplin seçimini destekler. Hedef seçici üç farklı başlangıç planını gösterir; dört aşamalı süreçte yerel `details` öğeleri ayrıntıları açar. Hareketli yazı şeridi, yörünge detayları ve kaydırma animasyonları hareketi durdurma düğmesiyle kapatılır; sistemin azaltılmış hareket tercihi de desteklenir.

## 4. Bölüm — etkileşimli 3D

`/bolum-4` adresinde Metaphy için uyarlanmış Spline sahnesi bulunur. `components/agency-spline.tsx` sayfa içeriğini, `components/ui/splite.tsx` yükleme ve hata durumlarıyla 3D sahneyi, `components/ui/spotlight.tsx` imleci takip eden ışığı içerir. Spline paketi gerektiğinde yüklenir. Sahne harici Spline adresinden geldiği için internet bağlantısı gerektirir. Mobilde metin ve sahne alt alta yerleşir. Hizmet ve yaklaşım bağlantıları birinci bölümdeki ilgili içeriğe açılır.

### Metaphy robot kıyafeti

`lib/robot-outfit.ts` sahne yüklendiğinde gövdeye mavi dokulu bir tişört kabuğu ve piksel karakterli METAPHY / GROWTH AGENCY baskısı ekler. Baskılar `Top part` nesnesinin çocuklarıdır; robotla birlikte hareket eder, ekran üzerinde sabit bir katman değildir. Tasarım yalnızca çalışma anında uygulanır, kaynak Spline sahnesi değiştirilmez. Aynı uygulamada tekrar eklenmesi WeakSet ile engellenir. Bu stilize bir 3D kıyafet görünümüdür; kumaş simülasyonu içermez.

### Robot karşılama sesi

`public/audio/metaphy-merhaba-holden.mp3` Türkçe “Merhaba, nasıl yardımcı olabilirim?” karşılama kaydıdır; Higgsfield Seed Audio üzerinden kullanıcının seçtiği Holden erkek sesiyle üretilmiş ve MP3 olarak eklenmiştir. Çalışırken harici TTS servisi, API anahtarı veya cihazda yüklü Türkçe ses gerektirmez. `components/talking-robot.tsx` tıklama/dokunma ve Enter/boşluk aktivasyonunu yönetir. Tek ses öğesi kullanır; tekrar tıklamada başa sarar ve sayfadan çıkarken durur. Sürükleme hareketi ses tetiklemez.

## 5. Bölüm — kaydırmalı kampanya ekranı

`/bolum-5`, `components/ui/container-scroll-animation.tsx` bileşenini kullanır. Framer Motion mevcut bağımlılıktır. `components/agency-scroll.tsx` Metaphy başlığını ve HTML ile hazırlanmış örnek kampanya planını içerir; müşteri sonucu veya gerçek performans verisi iddiası içermez. Kaydırmayla perspektif ve ölçek değişir; azaltılmış hareket tercihinde bu dönüşümler kapatılır. Hizmet bağlantısı ilk bölümdeki hizmetlere gider.

## Vercel kurulumu

GitHub reposunu Vercel’de yeni proje olarak içe aktarın.

- Framework Preset: **Next.js**
- Root Directory: repo kökü (`.`)
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: Next.js varsayılanı
- Node.js: **24.x**
- Environment Variables: mevcut site için gerekli değil.

Beş bölüm `/`, `/bolum-2`, `/bolum-3`, `/bolum-4`, `/bolum-5` adreslerindedir. Ses ve yerel medya dosyaları `public/` içindedir. Spline ve bazı demo medyaları harici servislerden yüklenir.

Yerel ağ önizlemesi için `npm run start:lan`; standart üretim sunucusu için `npm start` kullanılabilir.
