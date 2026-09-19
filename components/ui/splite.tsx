"use client";

import { Component, Suspense, lazy, useCallback, useState, type ReactNode } from "react";
import type { Application } from "@splinetool/runtime";
import { dressMetaphyRobot } from "@/lib/robot-outfit";
const Spline = lazy(() => import("@splinetool/react-spline"));

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <div role="status" className="flex h-full items-center justify-center p-8 text-center text-sm text-slate-400">3D deneyim şu an yüklenemedi. Sayfayı yenileyerek tekrar deneyebilirsin.</div> : this.props.children;
  }
}
function LoadingScene() {
  return <div role="status" className="absolute inset-0 flex items-center justify-center gap-3 text-xs text-slate-400"><span className="h-4 w-4 animate-spin rounded-full border border-white/20 border-t-blue-200 motion-reduce:animate-none" />3D deneyim hazırlanıyor…</div>;
}
export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback((app: Application) => {
    setLoaded(true);
    void dressMetaphyRobot(app).catch((error: unknown) => {
      // A scene disposed during navigation needs no further styling.
      if (!String(error).includes("disposed")) console.error("Robot outfit could not be applied", error);
    });
  }, []);
  return <SceneBoundary><Suspense fallback={<LoadingScene />}><div className={`relative ${className || ""}`}>
    {!loaded && <LoadingScene />}
    <Spline scene={scene} onLoad={onLoad} className="h-full w-full" />
  </div></Suspense></SceneBoundary>;
}
