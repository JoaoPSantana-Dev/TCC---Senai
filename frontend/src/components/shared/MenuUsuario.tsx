"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { BotaoSair } from "./BotaoSair";
import type { Usuario } from "@/lib/usuarios";

// botão com as iniciais do usuário e o painel da conta, nome, email, função, links e sair
// usado no HeaderPrivate e no HeaderTotem, que só mostram para administrador

function iniciaisDoNome(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (partes[0][0] + ultima).toUpperCase();
}

const classeItemMenu =
  "flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-left text-base font-medium text-zinc-800 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none";

export function MenuUsuario({ usuario }: { usuario: Usuario }) {
  const [aberto, setAberto] = useState(false);
  const raizRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const idMenu = useId();

  // fecha ao tocar fora ou apertar esc e o foco volta para o botão
  useEffect(() => {
    if (!aberto) return;

    function aoTocarFora(evento: PointerEvent) {
      if (raizRef.current && !raizRef.current.contains(evento.target as Node)) {
        setAberto(false);
      }
    }
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", aoTocarFora);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("pointerdown", aoTocarFora);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  const primeiroNome = usuario.nome.trim().split(/\s+/)[0] || usuario.nome;
  const iniciais = iniciaisDoNome(usuario.nome);

  return (
    <div ref={raizRef} className="relative text-zinc-900">
      <button
        ref={botaoRef}
        type="button"
        onClick={() => setAberto((atual) => !atual)}
        aria-expanded={aberto}
        aria-controls={aberto ? idMenu : undefined}
        aria-label={`Conta de ${usuario.nome}`}
        className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full border border-zinc-300 bg-zinc-50 py-1 pr-3 pl-1 transition-colors hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-red-600 text-sm font-semibold text-white"
        >
          {iniciais}
        </span>
        <span className="hidden max-w-36 truncate text-base font-medium text-zinc-800 sm:block">
          {primeiroNome}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-zinc-500 transition-transform ${aberto ? "rotate-180" : ""}`}
        />
      </button>

      {aberto && (
        <div
          id={idMenu}
          className="absolute top-full right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 motion-reduce:animate-none"
        >
          <div className="flex items-center gap-3 border-b border-zinc-200 p-4">
            <span
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-red-600 text-lg font-semibold text-white"
            >
              {iniciais}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-zinc-900">
                {usuario.nome}
              </p>
              <p className="truncate text-sm text-zinc-600">{usuario.email}</p>
              <span className="mt-1 inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                {usuario.funcao}
              </span>
            </div>
          </div>

          <nav aria-label="Conta" className="flex flex-col p-2">
            <Link
              href="/usuarios#meus-dados"
              onClick={() => setAberto(false)}
              className={classeItemMenu}
            >
              <UserRound aria-hidden="true" className="size-5 text-zinc-600" />
              Meus dados
            </Link>
            <Link
              href="/seguranca"
              onClick={() => setAberto(false)}
              className={classeItemMenu}
            >
              <ShieldCheck
                aria-hidden="true"
                className="size-5 text-zinc-600"
              />
              Segurança da conta
            </Link>

            <div className="my-1 border-t border-zinc-200" />

            <BotaoSair
              className={`${classeItemMenu} text-red-700 hover:bg-red-50`}
            >
              <LogOut aria-hidden="true" className="size-5" />
              Sair
            </BotaoSair>
          </nav>
        </div>
      )}
    </div>
  );
}
