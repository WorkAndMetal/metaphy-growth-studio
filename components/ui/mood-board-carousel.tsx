"use client";

import { useEffect, useRef, useState } from "react";

export interface SliderRevolutionCarouselProps {
  /** The embed key for a published module in Slider Revolution Anywhere. */
  embedKey: string;
  /** Accessible name of the region. */
  ariaLabel?: string;
  /** Extra classes for the outer section. */
  className?: string;
  /** Reserves the carousel's space while its remote module loads. */
  placeholderClassName?: string;
}

const join = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const loaderName = (embedKey: string) => `SR7_${embedKey.replace(/[^A-Za-z0-9]/g, "")}_1`;

/** Loads a Slider Revolution Anywhere module into an accessible, full-height host. */
export function SliderRevolutionCarousel({
  embedKey,
  ariaLabel = "Mood board carousel",
  className,
  placeholderClassName = "h-svh",
}: SliderRevolutionCarouselProps) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const element = host.current;
    if (!element || !embedKey) return;

    let disposed = false;
    setReady(false);
    setFailed(false);

    const script = document.createElement("script");
    script.src = `https://embed.sliderrevolution.com/i/${encodeURIComponent(embedKey)}/embed.js`;
    script.async = true;
    script.onerror = () => {
      if (!disposed) setFailed(true);
    };

    const observer = new ResizeObserver(() => {
      if (!disposed && element.offsetHeight > 0) setReady(true);
    });
    observer.observe(element);

    const timeout = window.setTimeout(() => {
      if (!disposed && !element.querySelector("sr7-module")) setFailed(true);
    }, 30_000);

    element.appendChild(script);

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      element.replaceChildren();
      const loaders = (window as Window & { __sraLoaders?: Record<string, unknown> }).__sraLoaders;
      if (loaders) delete loaders[loaderName(embedKey)];
    };
  }, [embedKey, attempt]);

  return (
    <section
      aria-label={ariaLabel}
      aria-busy={!ready && !failed}
      className={join("relative w-full overflow-hidden bg-[#080b12]", className)}
    >
      {!ready && (
        <div
          aria-hidden="true"
          className={join(
            "w-full rounded-md bg-white/5",
            !failed && "animate-pulse",
            placeholderClassName,
          )}
        />
      )}
      <div ref={host} className="sr-anywhere-embed-host w-full" />
      {failed && (
        <div role="status" className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#080b12] px-6 text-center text-white">
          <p className="text-lg font-medium">Mood Board şu anda yüklenemiyor.</p>
          <p className="max-w-md text-sm text-white/65">Animasyonlu görsel içerik için Slider Revolution bağlantısını kontrol edip yeniden deneyin.</p>
          <button
            type="button"
            onClick={() => setAttempt((current) => current + 1)}
            className="rounded-full border border-white/35 px-5 py-2 text-sm transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Yeniden dene
          </button>
        </div>
      )}
    </section>
  );
}

export default SliderRevolutionCarousel;
