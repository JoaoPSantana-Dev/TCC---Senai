import { iniciais } from "@/lib/usuarios";

interface AvatarProps {
  nome: string;
  administrador?: boolean;
  tamanho?: "md" | "lg";
}

// círculo com as iniciais, administrador ganha o vermelho do SENAI
export function Avatar({
  nome,
  administrador = false,
  tamanho = "md",
}: AvatarProps) {
  const medidas = tamanho === "lg" ? "size-14 text-lg" : "size-10 text-sm";
  const cores = administrador
    ? "bg-red-600 text-white"
    : "bg-zinc-200 text-zinc-700";

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${medidas} ${cores}`}
    >
      {iniciais(nome)}
    </span>
  );
}

export function SeloFuncao({ funcao }: { funcao: string }) {
  const administrador = funcao === "Administrador";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-sm font-medium ${
        administrador ? "bg-red-100 text-red-800" : "bg-zinc-100 text-zinc-700"
      }`}
    >
      {funcao}
    </span>
  );
}

// o texto acompanha a cor, então não depende só da cor para ser entendido
export function Selo2FA({ ativo }: { ativo: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-zinc-700">
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${ativo ? "bg-green-600" : "bg-zinc-400"}`}
      />
      {ativo ? "Ativo" : "Desativado"}
    </span>
  );
}
