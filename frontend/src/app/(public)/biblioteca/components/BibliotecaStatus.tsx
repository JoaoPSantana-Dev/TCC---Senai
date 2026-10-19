"use client";

import { useEffect, useState } from "react";

const horarios: Record<number, {
  abre: string;
  fecha: string;
  almoco?: {
    inicio: string;
    fim: string;
  }
} | null> = {
  0: null,
  1: { abre: "07:00", almoco: { inicio: "13:00", fim: "14:00" }, fecha: "16:00" },
  2: { abre: "07:00", almoco: { inicio: "13:00", fim: "14:00" }, fecha: "21:00" },
  3: { abre: "07:00", almoco: { inicio: "13:00", fim: "14:00" }, fecha: "21:00" },
  4: { abre: "07:00", almoco: { inicio: "13:00", fim: "14:00" }, fecha: "21:00" },
  5: { abre: "07:00", almoco: { inicio: "13:00", fim: "14:00" }, fecha: "21:00" },
  6: { abre: "09:00", fecha: "15:00" },
};

function paraMinutos(horario: string): number {
  const [horas, minutos] = horario.split(":").map(Number);
  return horas * 60 + minutos;
}

export function BibliotecaStatus() {
  const [agora, setAgora] = useState<Date | null>(null);

  useEffect(() => {
    const atualizarHorario = () => {
      setAgora(new Date());
    };

    atualizarHorario();

    const intervalo = setInterval(atualizarHorario, 30_000);

    return () => clearInterval(intervalo);
  }, []);

  if (!agora) {
    return (
      <div className="mt-6 rounded-2xl bg-gray-200 p-5">
        Verificando funcionamento...
      </div>
    );
  };

  const horarioHoje = horarios[agora.getDay()];

  const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();

  const dentroDoExpediente =
    horarioHoje !== null &&
    horarioHoje !== undefined &&
    minutosAtuais >= paraMinutos(horarioHoje.abre) &&
    minutosAtuais < paraMinutos(horarioHoje.fecha);

  const almoco = horarioHoje?.almoco ?? null;

  const emAlmoco =
    almoco !== null &&
    minutosAtuais >= paraMinutos(almoco.inicio) &&
    minutosAtuais < paraMinutos(almoco.fim);

  const aberto = dentroDoExpediente && !emAlmoco;

  const titulo = !horarioHoje
    ? "Biblioteca fechada"
    : emAlmoco
      ? "Fechada para almoço"
      : aberto
        ? "Biblioteca aberta"
        : "Biblioteca fechada";

  const descricao = !horarioHoje
    ? "Não há atendimento hoje"
    : emAlmoco
      ? `Retorno às ${almoco!.fim}`
      : aberto
        ? `Funcionamento até às ${horarioHoje.fecha}`
        : minutosAtuais < paraMinutos(horarioHoje.abre)
          ? `Abre às ${horarioHoje.abre}`
          : "O expediente de hoje já terminou";

  const cor = aberto
    ? {
      container: "border-green-400 bg-green-100",
      indicador: "bg-green-600",
      titulo: "text-green-800",
    } : emAlmoco
    ? {
      container: "border-amber-400 bg-amber-100",
      indicador: "bg-amber-500",
      titulo: "text-amber-800",
    } 
    : {
      container: "border-red-400 bg-red-100",
      indicador: "bg-red-600",
      titulo: "text-red-800",
    };

  return (
    <section aria-live="polite" className={`mt-6 rounded-2xl border p-5 ${cor.container}`}>
      <div className="flex items-center gap-3">
        <span className={`h-4 w-4 shrink-0 rounded-full ${cor.indicador}`} />
        <h2 className={`text-xl font-bold ${cor.titulo}`}>{titulo}</h2>
      </div>

      <p className="mt-2 text-zinc-700">{descricao}</p>

      {horarioHoje && (
        <div className="mt-2 text-sm text-zinc-600">
          <p>Funcionamento: {horarioHoje.abre} às {horarioHoje.fecha}</p>
          {almoco && (
            <p>Intervalo de almoço: {almoco.inicio} às {almoco.fim}</p>
          )}
        </div>
      )}

      <p className="mt-3 text-sm text-zinc-500">Horário atual: {agora.toLocaleTimeString("pt-BR")}</p>
    </section>
  );
}