'use client';

import { useEffect } from 'react';

export default function AnimationPage() {
  useEffect(() => {
    let cancelled = false;
    type Scene = { destroy?: () => void };
    let scenes: Scene[] = [];
    const studioWindow = window as typeof window & {
      UnicornStudio?: { init: () => Promise<Scene[]> };
    };
    const initialize = async () => {
      if (cancelled || !studioWindow.UnicornStudio) return;
      try {
        const loaded = await studioWindow.UnicornStudio.init();
        if (cancelled) loaded?.forEach(scene => scene.destroy?.());
        else scenes = loaded || [];
      } catch { /* The star background remains available if the embed cannot load. */ }
    };
    let script = document.querySelector<HTMLScriptElement>('script[data-metaphy-unicorn]');
    if (studioWindow.UnicornStudio) void initialize();
    else {
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js';
        script.async = true;
        script.dataset.metaphyUnicorn = 'true';
        document.head.appendChild(script);
      }
      script.addEventListener('load', initialize);
    }
    return () => {
      cancelled = true;
      script?.removeEventListener('load', initialize);
      scenes.forEach(scene => scene.destroy?.());
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <div 
          data-us-project="OMzqyUv6M3kSnv0JeAtC" 
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Mobile stars background */}
      <div className="absolute inset-0 w-full h-full stars-bg"></div>

      {/* Top Header */}
      <div className="absolute top-20 left-0 right-0 z-20 border-b border-white/20">
        <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="font-mono text-white text-xl lg:text-2xl font-bold tracking-widest italic transform -skew-x-12">
              METAPHY
            </div>
            <div className="h-3 lg:h-4 w-px bg-white/40"></div>
            <span className="text-white/60 text-[8px] lg:text-[10px] font-mono">GROWTH STUDIO</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono text-white/60">
            <span>STRATEJİ + KREATİF</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span>DİJİTAL PERFORMANS</span>
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20"></div>
      <div className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>
      <div className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>

      {/* CTA Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-end pt-44 pb-36 lg:pt-32 lg:pb-28" style={{ marginTop: '5vh' }}>
        <div className="w-full lg:w-1/2 px-6 lg:px-16 lg:pr-[10%]">
          <div className="max-w-lg relative lg:ml-auto">
            {/* Top decorative line */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">∞</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h1 className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider lg:-ml-[5%]" style={{ letterSpacing: '0.1em' }}>
                BÜYÜMEYE ODAKLAN.
              </h1>
            </div>

            {/* Decorative dots pattern - desktop only */}
            <div className="hidden lg:flex gap-1 mb-3 opacity-40">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-white rounded-full"></div>
              ))}
            </div>

            {/* Description with subtle grid pattern */}
            <div className="relative">
              <p className="text-xs lg:text-base text-gray-300 mb-5 lg:mb-6 leading-relaxed font-mono opacity-80">
                Markanızın bir sonraki adımını birlikte tasarlayalım. Strateji, yaratıcı içerik ve performans reklamlarını bir araya getiriyor; her kampanyayı ölçüyor, her içgörüyü yeni bir büyüme fırsatına dönüştürüyoruz.
              </p>
              
              {/* Technical corner accent - desktop only */}
              <div className="hidden lg:block absolute -left-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: 'translateY(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }}></div>
              </div>
            </div>

            {/* Buttons with technical accents */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <a href="/#hizmetler" className="relative text-center px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group">
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                HİZMETLERİ KEŞFET
              </a>
              
              <a href="/#yaklasim" className="relative text-center px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200" style={{ borderWidth: '1px' }}>
                YAKLAŞIMIMIZ
              </a>
            </div>

            {/* Bottom technical notation - desktop only */}
            <div className="hidden lg:flex items-center gap-2 mt-6 opacity-40">
              <span className="text-white text-[9px] font-mono">∞</span>
              <div className="flex-1 h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono">METAPHY.GROWTH.STUDIO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm" style={{ bottom: '5vh' }}>
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">STRATEJİYLE BAŞLAR</span>
            <span className="lg:hidden">METAPHY</span>
            <div className="hidden lg:flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-1 h-3 bg-white/30" style={{ height: `${[6, 12, 8, 15, 10, 7, 13, 9][i]}px` }}></div>
              ))}
            </div>
            <span>VERİYLE GELİŞİR</span>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">◐ YARATICILIKLA FARK YARATIR</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="hidden lg:inline">HEDEF: BÜYÜME</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dither-pattern {
          background-image: 
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }
        
        .stars-bg {
          background-image: 
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position: 0% 0%, 40% 40%, 60% 60%, 20% 20%, 80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.3;
        }
      `}</style>
    </main>
  );
}
