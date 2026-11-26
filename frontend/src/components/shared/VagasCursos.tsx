import { PainelVagas } from "./PainelVagas";
import type { ConfigPainel } from "@/lib/painelVagas";

const config: ConfigPainel = {
  caminho: "/vagas-curso",
  campoId: "idCurso",
  campoTitulo: "nomeCurso",
  campoMarca: "nomeCurso",
  meta: [
    { campo: "turno", icone: "turno" },
    { campo: "cargaHoraria", icone: "carga" },
  ],
  campoArea: "areaCurso",
  detalhes: [
    { rotulo: "Descrição", campo: "descricao" },
    { rotulo: "Requisitos", campo: "requisitos" },
    { rotulo: "Contato", campo: "contato" },
  ],
  nomeSingular: "curso",
  nomePlural: "cursos",
  textoVazio: "Nenhum curso cadastrado no momento.",
};

// cursos, vindos do banco
// GET /vagas-curso
export function VagasCursos() {
  return <PainelVagas config={config} />;
}
