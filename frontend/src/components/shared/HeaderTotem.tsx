"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavbarHamburguer } from "./NavbarHamburguer";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// componente principal do cabeçalho do totem
// exibe a barra superior com utilitários e, dependendo da rota, ajusta o layout para a homepage ou para as páginas internas

export function HeaderTotem() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>("");
  const [temperature, setTemperature] = useState<number | null>(null);

  // API de Horario
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR"));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // API de Clima
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let cancelado = false;

    const checkTemperature = async (
      latitude: number,
      longitude: number
    ) => {
      try {

        const parametros = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current: "temperature_2m",
          temperature_unit: "celsius",
          timezone: "America/Sao_Paulo",
        });

        const url = `https://api.open-meteo.com/v1/forecast?${parametros.toString()}`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
          const mensagemErro = await resposta.text();
          console.error("Resposta da API:", mensagemErro);

          throw new Error(`Erro HTTP ${resposta.status}: ${mensagemErro}`);
        }

        const dados = await resposta.json();

        if (typeof dados.current?.temperature_2m !== "number") {
          throw new Error("Temperatura indisponível na resposta da API");
        }

        if (!cancelado) {
          setTemperature(dados.current.temperature_2m);
        }

      } catch (erro) {
        console.log("Erro ao buscar temperature", erro);

        if (!cancelado) {
          toast.error("Não foi possivel atualizar a temperatura");
        };
      }
    };

    const latitudeFallback = -23.5315;
    const longitudeFallback = -46.7245;

    const userLocalizacaoFallback = () => {
      if (cancelado) return;

      checkTemperature(latitudeFallback, longitudeFallback);

      interval = setInterval(() => {
        checkTemperature(latitudeFallback, longitudeFallback);
      }, 10 * 60 * 1000);
    };

    if (!navigator.geolocation) {
      userLocalizacaoFallback();
    } else {
      navigator.geolocation.getCurrentPosition(
        (posicao) => {
          if (cancelado) return;

          const { latitude, longitude } = posicao.coords;

          checkTemperature(latitude, longitude);

          interval = setInterval(() => {
            checkTemperature(latitude, longitude);
          }, 10 * 60 * 1000);
        },
        () => {
          userLocalizacaoFallback();
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    };

    return () => {
      cancelado = true;

      if (interval) {
        clearInterval(interval);
      };
    };
  }, []);

  return (
    <header className="relative w-full text-white border-b-2 border-gray-300 bg-white mb-8">
      {/* informações extras */}
      <div className="flex w-full bg-red-600 gap-2 items-center justify-between px-2">
        <p className="font-semibold text-sm uppercase truncate">
          FIESP CIESP SESI SENAI IRS | F | TW | YT | iN | iNt | wz
        </p>

        <time className="font-semibold text-sm uppercase truncate shrink-0 flex items-center justify-center gap-2">
          <span>{time || "00:00:00"}</span>
          <span>
            {temperature !== null ? `${temperature}°C` : "--°C"}
          </span>
        </time>
      </div>
      {/* informações extras */}

      {/* menu hambúrguer */}
      <nav className="flex text-black">
        {pathname !== "/homepage" && <NavbarHamburguer />}
      </nav>
      {/* menu hambúrguer */}

      {/* logo */}
      <figure className="flex justify-center p-4">
        <Image
          src="/senai-logo.png"
          alt="Imagem do logo SENAI"
          width={200}
          height={200}
          className="w-auto h-auto max-w-full object-contain"
          loading="eager"
        />
      </figure>
      {/* logo */}
    </header>
  );
}
