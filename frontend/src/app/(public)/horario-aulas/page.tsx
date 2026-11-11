"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/lib/paginas";
import { normalizar } from "@/lib/painelVagas";

interface Aula {
  idHorariosAula: number;
  nomeCurso: string;
  professor: string;
  materia: string;
  turno: string;
  dia: string;
  sala: { 
    idSala: number; 
    nomeSala: string; 
    andar: string; 
    bloco: string 
  };
}

const DIAS = [
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function CronogramaAulas() {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [curso, setCurso] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/horarios-aula`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setAulas)
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  const cursos = useMemo(
    () => [...new Set(aulas.map((a) => a.nomeCurso))],
    [aulas],
  );

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Não foi possível carregar os horários.</p>;
  if (cursos.length === 0) return <p>Nenhuma aula cadastrada.</p>;


  if (!curso) {
    return (
      <div className="flex flex-wrap gap-3">
        {cursos.map((nome) => (
          <button
            key={nome}
            type="button"
            onClick={() => setCurso(nome)}
            className="rounded-full bg-[#f9f9f9] px-6 py-3 font-semibold shadow-md active:scale-95"
          >
            {nome}
          </button>
        ))}
      </div>
    );
  }

  
  const aulasDoCurso = aulas.filter((a) => a.nomeCurso === curso);

  return (
    <div className="flex flex-col gap-4">
      <button type="button" onClick={() => setCurso(null)} className="w-fit underline">
        ← Trocar de turma
      </button>

      <div className="grid grid-cols-6 gap-3">
        {DIAS.map((dia) => (
          <div key={dia} className="flex flex-col gap-2">
            <p className="text-center text-sm font-semibold whitespace-nowrap">{dia}</p>

            {aulasDoCurso
              .filter((a) => normalizar(a.dia) === normalizar(dia))
              .map((aula) => (
                <div key={aula.idHorariosAula} className="rounded-lg border p-2 text-sm">
                  <p className="font-medium">{aula.materia}</p>
                  <p>{aula.professor}</p>
                  <p className="text-xs text-gray-500">{aula.turno}</p>
                  <Link
                    href={`/mapa?sala=${encodeURIComponent(aula.sala.nomeSala)}`}
                    className="mt-1 inline-block text-xs underline"
                  >
                    {aula.sala.nomeSala} · ver no mapa
                  </Link>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}