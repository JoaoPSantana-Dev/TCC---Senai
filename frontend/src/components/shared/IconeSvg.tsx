import { createElement } from "react";
import { elementosDoIcone, type DadosIcone } from "@/lib/iconeSvg";

// desenha um ícone a partir dos dados salvos ({ nome, dados })
// só usa tags e atributos de svg permitidos
// a cor vem do texto em volta currentColor, use className="text-zinc-900", etc
export function IconeSvg({
  dados,
  tamanho = 24,
  className,
}: {
  dados: DadosIcone;
  tamanho?: number;
  className?: string;
}) {
  const elementos = elementosDoIcone(dados);

  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {elementos.map(({ tag, atributos }, indice) =>
        createElement(tag, { ...atributos, key: indice }),
      )}
    </svg>
  );
}
