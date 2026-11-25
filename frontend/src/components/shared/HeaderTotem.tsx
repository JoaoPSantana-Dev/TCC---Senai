"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavbarHamburguer } from "./NavbarHamburguer";
import { MenuUsuario } from "./MenuUsuario";
import { carregarUsuarioLogado, useUsuarioLogado } from "@/lib/usuarioLogado";
import { useEffect, useRef, useState } from "react";
import { Anchor } from "lucide-react";

// componente principal do cabeçalho do totem
// exibe a barra superior com utilitários e, dependendo da rota, ajusta o layout para a homepage ou para as páginas internas

export function HeaderTotem({
  ocultarMenu = false,
  semMargem = false,
}: {
  ocultarMenu?: boolean;
  semMargem?: boolean;
}) {
  // cálculo do tamanho da notícia
  const pathname = usePathname();
  const refHeader = useRef<HTMLElement>(null);

  // menu da conta só para administrador, e não no editor de páginas
  const { usuario } = useUsuarioLogado();
  useEffect(() => {
    carregarUsuarioLogado();
  }, []);
  const administrador = usuario?.funcao === "Administrador" ? usuario : null;
  const menuConta =
    administrador && !ocultarMenu ? (
      <MenuUsuario usuario={administrador} />
    ) : null;

  useEffect(() => {
    const header = refHeader.current;
    const pai = header?.parentElement;
    if (!header || !pai) return;

    const atualizar = () =>
      pai.style.setProperty("--altura-header", `${header.offsetHeight}px`);

    atualizar();
    const observador = new ResizeObserver(atualizar);
    observador.observe(header);

    return () => observador.disconnect();
  }, []);

  // header transparente
  const ehHomepage = pathname === "/homepage";
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    if (!ehHomepage) {
      setRolou(true);
      return;
    }

    const aoRolar = () => setRolou(window.scrollY > 40);

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [ehHomepage]);
  const transparente = ehHomepage && !rolou;

  return (
    <header
      ref={refHeader}
      className={`sticky top-0 left-0 z-40 w-full text-white transition-colors duration-300
        ${transparente ? "bg-transparent border-transparent" : "bg-white shadow-lg shadow-black/5"}
        ${semMargem ? "" : "mb-8"}`}
    >
      {/* blur preto */}
      {transparente && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/50 to-transparent" />
      )}

      {/* menu hambúrguer */}
      <nav className="flex text-black">
        {pathname !== "/homepage" && !ocultarMenu && <NavbarHamburguer />}
      </nav>
      {/* menu hambúrguer */}

      {/* logo */}
      {pathname !== "/homepage" ? (
        <>
          <figure
            className={`flex justify-center items-center w-full px-12 py-3`}
          >
            <Image
              src="/senai-logo.png"
              alt="Imagem do logo SENAI"
              width={200}
              height={200}
              sizes="(max-width: 480px) 75vw, (max-width: 768px) 65vw, 300px"
              className="w-[65vw] max-w-75 h-auto object-contain sm:w-[60vw] md:w-75"
              loading="eager"
            />
          </figure>

          {/* menu da conta só para administrador */}
          {menuConta && (
            <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2 sm:right-9">
              {menuConta}
            </div>
          )}
        </>
      ) : (
        <div
          className={`gap-2 flex items-center mx-auto px-6 lg:px-12 py-5 fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${transparente ? "bg-transparent" : "shadow-lg bg-card/95 backdrop-blur-lg shadow-soft"}`}
        >
          <Anchor
            className={`h-4 w-4 ${transparente ? "text-white filter-[drop-shadow(0_1px_4px_rgba(0,0,0,0.5))]" : "text-foreground"}`}
          />
          <span
            className={`text-xl font-normal tracking-wide ${transparente ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]" : "text-foreground"}`}
          >
            S-Hub
          </span>

          {/* menu da conta só para administrador */}
          {menuConta && <div className="ml-auto">{menuConta}</div>}
        </div>
      )}

      {/* logo */}
    </header>
  );
}
