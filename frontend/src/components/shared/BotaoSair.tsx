"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { limparUsuarioLogado } from "@/lib/usuarioLogado";

interface BotaoSairProps {
  className?: string;
  children?: ReactNode;
}

export function BotaoSair({
  className = "text-lg font-medium text-zinc-700 hover:text-red-600 cursor-pointer",
  children = "Sair",
}: BotaoSairProps) {
  const router = useRouter();

  async function sair() {
    await fetch("/api/auth/logout", { method: "POST" });
    limparUsuarioLogado();
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={sair} className={className}>
      {children}
    </button>
  );
}
