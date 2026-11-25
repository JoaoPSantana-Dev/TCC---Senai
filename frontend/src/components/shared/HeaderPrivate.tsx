"use client";

import { useEffect } from "react";
import Image from "next/image";
import { MenuUsuario } from "./MenuUsuario";
import { NavbarHamburguer } from "./NavbarHamburguer";
import {
  carregarUsuarioLogado,
  useUsuarioLogado,
} from "@/lib/usuarioLogado";

// cabeçalho das páginas de administração
// - só aparece para administrador (para os outros não renderiza nada)
// - fica fixo no topo, mesmo rolando a página
// - o logo fica no centro da tela de verdade: três colunas, as laterais com o mesmo tamanho
// ele é fixo (e não sticky) para não depender da altura da página que o contém
// por isso o <div> vazio logo depois dele reserva o mesmo espaço no fluxo da página

export function HeaderPrivate() {
  const { carregando, usuario } = useUsuarioLogado();

  // confirma quem está logado toda vez que uma página de administração abre
  useEffect(() => {
    carregarUsuarioLogado();
  }, []);

  // reserva o espaço do cabeçalho
  const espaco = <div aria-hidden="true" className="mb-10 h-20 shrink-0" />;

  // enquanto não sabe quem é, não mostra nada para não aparecer para quem não é administrador
  if (carregando && !usuario) return espaco;
  if (usuario?.funcao !== "Administrador") return null;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 h-20 border-b border-zinc-200 bg-white">
        <NavbarHamburguer className="absolute top-1/2 left-6 h-10 w-18 -translate-y-1/2" />

        <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-6">
          <div />

          <figure className="flex justify-center">
            <Image
              src="/senai-logo.png"
              alt="Logo do SENAI"
              width={256}
              height={66}
              className="h-12 w-auto object-contain"
              loading="eager"
            />
          </figure>

          <div className="flex justify-end">
            <MenuUsuario usuario={usuario} />
          </div>
        </div>
      </header>

      {espaco}
    </>
  );
}
