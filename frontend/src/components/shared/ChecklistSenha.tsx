import { regrasSenha } from "@/lib/autenticacao";
import { Check, CircleDashed } from "lucide-react";

// mostra, enquanto a pessoa digita, quais requisitos da senha já foram atendidos
export function ChecklistSenha({ senha }: { senha: string }) {
  return (
    <ul
      className="flex flex-col gap-1 text-sm justify-between"
      aria-label="Requisitos da senha"
    >
      {regrasSenha.map((regra) => {
        const atendida = regra.valida(senha);
        return (
          <li
            key={regra.id}
            className={`${atendida ? "text-green-700" : "text-zinc-500"} flex flex-row items-center gap-0.5`}
          >
            <span>
              {atendida ? <Check /> : <CircleDashed />}
            </span>{" "}
            {regra.texto}
          </li>
        );
      })}
    </ul>
  );
}
