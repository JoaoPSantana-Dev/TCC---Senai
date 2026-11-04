"use client";

import { useRouter } from "next/navigation";

export function BotaoSair() {
  const router = useRouter();

  async function sair() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={sair}
      className="text-sm font-medium text-zinc-700 hover:text-red-600 cursor-pointer"
    >
      Sair
    </button>
  );
}
