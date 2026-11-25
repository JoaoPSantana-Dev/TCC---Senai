"use client";

import { useId } from "react";
import {
  Building2,
  ChevronDown,
  Clock,
  Hourglass,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import {
  iniciaisDaMarca,
  linhasPreenchidas,
  valorDoCampo,
  type ConfigPainel,
  type IconeMeta,
  type Registro,
} from "@/lib/painelVagas";

// uma linha da lista de vagas, e dos cursos também
// a linha toda é um botão grande, tocar abre e fecha os detalhes

const icones: Record<IconeMeta, LucideIcon> = {
  empresa: Building2,
  local: MapPin,
  turno: Clock,
  carga: Hourglass,
};

interface CartaoVagaProps {
  config: ConfigPainel;
  registro: Registro;
  aberto: boolean;
  aoAlternar: () => void;
}

export function CartaoVaga({
  config,
  registro,
  aberto,
  aoAlternar,
}: CartaoVagaProps) {
  const id = useId();
  const titulo = valorDoCampo(registro, config.campoTitulo) || "(sem título)";
  const marca = valorDoCampo(registro, config.campoMarca) || titulo;
  const destaque = config.campoDestaque
    ? valorDoCampo(registro, config.campoDestaque)
    : "";
  const area = config.campoArea ? valorDoCampo(registro, config.campoArea) : "";
  const meta = config.meta
    .map((item) => ({ ...item, valor: valorDoCampo(registro, item.campo) }))
    .filter((item) => item.valor !== "");
  const detalhes = linhasPreenchidas(registro, config.detalhes);

  // vai à direita em telas largas e embaixo do título nas estreitas
  const lateral = (
    <>
      {destaque && (
        <span className="text-base font-semibold text-red-600 sm:text-lg">
          {destaque}
        </span>
      )}
      {area && (
        <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-sm font-medium text-zinc-700">
          {area}
        </span>
      )}
    </>
  );

  return (
    <li className="rounded-2xl bg-white shadow-md">
      <button
        type="button"
        onClick={aoAlternar}
        aria-expanded={aberto}
        aria-controls={aberto ? `${id}-detalhes` : undefined}
        className="flex w-full cursor-pointer touch-manipulation items-center gap-4 rounded-2xl p-4 text-left select-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none sm:p-5"
      >
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg font-bold text-red-700"
        >
          {iniciaisDaMarca(marca)}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold wrap-break-word text-zinc-900">
            {titulo}
          </span>

          {meta.length > 0 && (
            <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-base text-zinc-600">
              {meta.map(({ campo, icone, valor }) => {
                const Icone = icones[icone];
                return (
                  <span
                    key={campo}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Icone
                      aria-hidden="true"
                      className="size-4 shrink-0 text-zinc-500"
                    />
                    {valor}
                  </span>
                );
              })}
            </span>
          )}

          <span className="mt-2 flex flex-wrap items-center gap-2 sm:hidden">
            {lateral}
          </span>
        </span>

        <span className="hidden max-w-60 shrink-0 flex-col items-end gap-2 text-right sm:flex">
          {lateral}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={`size-6 shrink-0 text-zinc-500 transition-transform ${
            aberto ? "rotate-180" : ""
          }`}
        />
      </button>

      {aberto && (
        <div
          id={`${id}-detalhes`}
          className="border-t border-zinc-200 px-5 pt-4 pb-5 sm:px-6"
        >
          {detalhes.length === 0 ? (
            <p className="text-zinc-500">
              {titulo} ainda não tem mais detalhes cadastrados
            </p>
          ) : (
            <dl className="grid gap-4 sm:grid-cols-2">
              {detalhes.map(({ rotulo, campo, valor }) => {
                // textos longos ocupam a linha toda
                const longo = valor.length > 60 || valor.includes("\n");
                return (
                  <div key={campo} className={longo ? "sm:col-span-2" : ""}>
                    <dt className="text-sm font-semibold text-zinc-500">
                      {rotulo}
                    </dt>
                    <dd className="mt-0.5 text-base wrap-break-word whitespace-pre-line text-zinc-800">
                      {valor}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
        </div>
      )}
    </li>
  );
}
