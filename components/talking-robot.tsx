"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";

export function TalkingRobot() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const [speaking, setSpeaking] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    return () => { audio?.pause(); };
  }, []);

  async function greet() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setMessage("Merhaba, nasıl yardımcı olabilirim?");
    try {
      await audio.play();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setSpeaking(false);
      setMessage("Ses oynatılamadı. Tekrar denemek için robota tıkla.");
    }
  }

  return (
    <div className="relative h-full w-full">
      <audio ref={audioRef} src="/audio/metaphy-merhaba-holden.mp3" preload="auto"
        onPlay={() => setSpeaking(true)} onEnded={() => setSpeaking(false)} onPause={() => setSpeaking(false)} />
      <div role="button" tabIndex={0} aria-label="Robotu konuştur: Merhaba, nasıl yardımcı olabilirim?"
        className="h-full w-full cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-blue-200"
        onPointerDown={(event) => { pointerStart.current = { x: event.clientX, y: event.clientY }; dragged.current = false; }}
        onPointerMove={(event) => { const start = pointerStart.current; if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) dragged.current = true; }}
        onPointerCancel={() => { dragged.current = true; pointerStart.current = null; }}
        onClick={(event) => {
          pointerStart.current = null;
          if (dragged.current || (event.target instanceof Element && event.target.closest("a"))) return;
          void greet();
        }}
        onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && !event.repeat) { event.preventDefault(); void greet(); } }}>
        <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="h-full w-full" />
      </div>
      <p role="status" aria-live="polite" className={`pointer-events-none absolute left-5 right-5 top-5 rounded-xl border border-blue-200/20 bg-slate-950/85 px-4 py-3 text-center text-sm text-blue-100 backdrop-blur-sm transition-opacity ${message ? "opacity-100" : "opacity-0"}`}>{message}</p>
      <p className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-2 text-[10px] tracking-wider text-blue-100/80"><Volume2 size={14} className={speaking ? "animate-pulse" : ""} />{speaking ? "METAPHY KONUŞUYOR…" : "ROBOTA TIKLA, MERHABA DESİN."}</p>
    </div>
  );
}
