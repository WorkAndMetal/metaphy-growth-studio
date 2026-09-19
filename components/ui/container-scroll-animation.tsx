"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScroll, useTransform, useReducedMotion, motion, type MotionValue } from "framer-motion";

export function ContainerScroll({ titleComponent, children }: { titleComponent: ReactNode; children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const rotate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : isMobile ? [0.94, 1] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -55]);
  return (
    <div ref={containerRef} className="relative mx-auto flex min-h-[1050px] max-w-7xl items-start justify-center px-3 pt-12 md:min-h-[1250px] md:px-16 md:pt-16">
      <div className="sticky top-24 w-full pb-20" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} translate={translate}>{children}</Card>
      </div>
    </div>
  );
}
export function Header({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: ReactNode }) {
  return <motion.div style={{ translateY: translate }} className="mx-auto mb-10 max-w-5xl text-center md:mb-14">{titleComponent}</motion.div>;
}
export function Card({ rotate, scale, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; translate: MotionValue<number>; children: ReactNode }) {
  return <motion.div style={{ rotateX: rotate, scale, boxShadow: "0 24px 90px #0009, 0 0 80px #9ae6b40a", willChange: "transform" }} className="mx-auto h-[460px] w-full max-w-5xl rounded-[24px] border-2 border-[#57665f] bg-[#19231f] p-2 md:h-[570px] md:rounded-[30px] md:p-3">
    <div className="h-full w-full overflow-hidden rounded-[16px] bg-[#edf4ef] text-[#162b22]">{children}</div>
  </motion.div>;
}
