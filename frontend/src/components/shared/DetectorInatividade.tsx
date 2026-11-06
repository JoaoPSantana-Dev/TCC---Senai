"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const tempoLimite = 60 * 1000;
const rotaDescanso = "/descanso";

const eventos = [
  "mousemove",
  "mousedown",
  "touchstart",
  "scroll",
  "keydown",
  "click",
] as const;

export function DetectorInaividade() {
  const router = useRouter();
  const pathname = usePathname();
  const referenciaTempo = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname === rotaDescanso) return;
    const reiniciar = () => {
      if (referenciaTempo.current) clearTimeout(referenciaTempo.current);
      referenciaTempo.current = setTimeout(() => {
        router.replace(rotaDescanso);
      }, tempoLimite);
    };
    eventos.forEach((e) =>
      window.addEventListener(e, reiniciar, { passive: true }),
    );
    reiniciar();
    return () => {
      if (referenciaTempo.current) clearTimeout(referenciaTempo.current);
      eventos.forEach((e) => window.removeEventListener(e, reiniciar));
    };
  }, [pathname, router]);
  return null;
}
