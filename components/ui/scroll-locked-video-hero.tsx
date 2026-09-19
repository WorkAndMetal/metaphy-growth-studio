"use client"

import { useEffect, useRef, useState } from "react"

// Scroll input scrubs a local, independently decodable-frame video.
// Rendering sleeps between gestures; only one video seek can be in flight.

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  /** Total input distance (px) needed to scrub the full video. Tune to taste. */
  scrubDistance?: number
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_VIDEO = "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4"
const DEFAULT_SIGNATURE = { name: "guglielmogiannattasio.exe", url: "https://www.guglielmogiannattasio.it" }
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "THE CITY OPENS",
  scrollHint = "SCROLL",
  tagline = "Every door in the city is already open.",
  signature = DEFAULT_SIGNATURE,
  scrubDistance = 3200,
  className,
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = videoRef.current
    if (!element) return
    const video = element
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const body = document.body
    const savedStyles = { position: body.style.position, top: body.style.top, left: body.style.left, right: body.style.right, width: body.style.width, height: body.style.height, overscrollBehavior: body.style.overscrollBehavior }
    const scrollY = window.scrollY
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, left: "0", right: "0", width: "100%", height: "100%", overscrollBehavior: "none" })

    let disposed = false
    let duration = 0
    let target = 0
    let progress = 0
    let lastPaint = -1
    let raf = 0
    let previousTime = 0
    let lastSeekTime = -Infinity
    let requestedFrame = -1
    let touchY: number | null = null
    const fps = 30
    setReady(false)

    function wake() {
      if (!disposed && !document.hidden && !raf) raf = requestAnimationFrame(frame)
    }

    function paint() {
      if (Math.abs(progress - lastPaint) < 0.00001) return
      lastPaint = progress
      video.style.transform = `scale(${1 + progress * 0.06})`
      const titleAmount = 1 - clamp(progress / 0.35, 0, 1)
      const taglineAmount = clamp((progress - 0.82) / 0.18, 0, 1)
      if (titleRef.current) {
        titleRef.current.style.opacity = String(titleAmount)
        titleRef.current.style.transform = `translate3d(0, ${(1 - titleAmount) * -24}px, 0)`
      }
      if (taglineRef.current) {
        taglineRef.current.style.opacity = String(taglineAmount)
        taglineRef.current.style.transform = `translate3d(0, ${(1 - taglineAmount) * 20}px, 0)`
      }
      if (hintRef.current) hintRef.current.style.opacity = target > 0.001 ? "0" : "1"
      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${progress})`
    }

    function frame(now: number) {
      raf = 0
      const elapsed = previousTime ? Math.min(now - previousTime, 50) : 16.67
      previousTime = now
      progress = reducedMotion ? target : progress + (target - progress) * (1 - Math.exp(-elapsed / 85))
      const moving = Math.abs(target - progress) > 0.0001
      if (!moving) progress = target
      paint()
      const desiredFrame = Math.min(Math.round(progress * duration * fps), Math.max(0, Math.ceil(duration * fps) - 1))
      if (duration > 0 && desiredFrame !== requestedFrame && !video.seeking && now - lastSeekTime >= 1000 / fps) {
        requestedFrame = desiredFrame
        lastSeekTime = now
        video.currentTime = desiredFrame / fps
      }
      // Seek completion wakes us if the latest requested position has changed.
      // No endless animation loop and no queue of stale intermediate frames.
      if (moving || (duration > 0 && desiredFrame !== requestedFrame && !video.seeking)) wake()
      else previousTime = 0
    }

    function loaded() {
      if (disposed || !Number.isFinite(video.duration)) return
      duration = video.duration
      setReady(true)
      wake()
    }
    function delta(amount: number) {
      target = clamp(target + amount / Math.max(1, scrubDistance), 0, 1)
      wake()
    }
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      event.preventDefault()
      delta(event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1))
    }
    const touchStart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? null }
    const touchMove = (event: TouchEvent) => {
      if (touchY === null || event.touches.length !== 1) return
      const next = event.touches[0].clientY
      event.preventDefault()
      delta(touchY - next)
      touchY = next
    }
    const touchEnd = () => { touchY = null }
    const keyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest("a, button, input, textarea, select, [contenteditable]")) return
      const offsets: Record<string, number> = { ArrowDown: 120, ArrowUp: -120, PageDown: 600, PageUp: -600, " ": event.shiftKey ? -600 : 600, Home: -scrubDistance, End: scrubDistance }
      if (event.key in offsets) { event.preventDefault(); delta(offsets[event.key]) }
    }
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; previousTime = 0 }
      else wake()
    }
    video.addEventListener("loadeddata", loaded)
    video.addEventListener("seeked", wake)
    window.addEventListener("wheel", wheel, { passive: false })
    window.addEventListener("touchstart", touchStart, { passive: true })
    window.addEventListener("touchmove", touchMove, { passive: false })
    window.addEventListener("touchend", touchEnd)
    window.addEventListener("touchcancel", touchEnd)
    window.addEventListener("keydown", keyDown)
    document.addEventListener("visibilitychange", visibility)
    if (video.readyState >= 2) loaded()
    else video.play().then(() => { video.pause(); if (!disposed && video.readyState >= 2) loaded() }).catch(() => {})
    wake()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      video.pause()
      video.removeEventListener("loadeddata", loaded)
      video.removeEventListener("seeked", wake)
      window.removeEventListener("wheel", wheel)
      window.removeEventListener("touchstart", touchStart)
      window.removeEventListener("touchmove", touchMove)
      window.removeEventListener("touchend", touchEnd)
      window.removeEventListener("touchcancel", touchEnd)
      window.removeEventListener("keydown", keyDown)
      document.removeEventListener("visibilitychange", visibility)
      Object.assign(body.style, savedStyles)
      window.scrollTo(0, scrollY)
    }
  }, [scrubDistance, videoSrc])

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        touchAction: "none",
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
          touchAction: "none",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.55))",
          pointerEvents: "none",
        }}
      />

      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          willChange: "transform, opacity",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: "clamp(30px, 7vw, 96px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            display: "inline-block",
            willChange: "transform, opacity",
          }}
        >
          {title}
        </span>
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(20px, 3.4vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {tagline}
          </span>
        </div>
      )}

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(240,244,248,0.75)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Thin progress line — fills as the video advances. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95))",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {signature && (
        <span
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            letterSpacing: "0.01em",
            color: "rgba(220,224,232,0.6)",
            zIndex: 2,
          }}
        >
          by{" "}
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(220,224,232,0.6)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = COL_TEXT
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = "rgba(220,224,232,0.6)"
            }}
          >
            {signature.name}
          </a>
        </span>
      )}
    </div>
  )
}
