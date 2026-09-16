// HeaderBarraUtilitariosComponent
// barra superior fixa com informações institucionais, hora atual e clima

import { useEffect, useState } from "react";

export function HeaderBarraUtilitariosComponent() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR"));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full bg-red-600 gap-2 items-center justify-between px-2">
      <p className="font-semibold text-sm uppercase truncate">
        FIESP CIESP SESI SENAI IRS | F | TW | YT | iN | iNt | wz
      </p>

      <time className="font-semibold text-sm uppercase truncate shrink-0 flex items-center justify-center gap-2">
        <span>{time || "00:00:00"}</span>
        <span>21°</span>
      </time>
    </div>
  );
}
