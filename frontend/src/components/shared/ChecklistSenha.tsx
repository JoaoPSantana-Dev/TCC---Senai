import { regrasSenha } from "@/lib/autenticacao";
import { CheckIcon, DashedLineCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// mostra, enquanto a pessoa digita, quais requisitos da senha já foram atendidos
export function ChecklistSenha({ senha }: { senha: string }) {
  return (
    <ul
      className="flex flex-row gap-0.5 text-sm justify-between"
      aria-label="Requisitos da senha"
    >
      {regrasSenha.map((regra) => {
        const atendida = regra.valida(senha);
        return (
          <li
            key={regra.id}
            className={atendida ? "text-green-700" : "text-zinc-500"}
          >
            <span>
              {atendida ? (
                <HugeiconsIcon icon={CheckIcon} />
              ) : (
                <HugeiconsIcon icon={DashedLineCircleIcon} />
              )}
            </span>{" "}
            {regra.texto}
          </li>
        );
      })}
    </ul>
  );
}
