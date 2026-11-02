import { PainelVagas } from "./PainelVagas";
import type { ConfigPainel } from "@/lib/painelVagas";

const config: ConfigPainel = {
  caminho: "/vagas-curso",
  campoTitulo: "nomeCurso",
  destaques: [{ rotulo: "Curso", campo: "nomeCurso" }],
  detalhes: [
    { rotulo: "Área", campo: "areaCurso" },
    { rotulo: "Descrição", campo: "descricao" },
    { rotulo: "Requisitos", campo: "requisitos" },
    { rotulo: "Carga horária", campo: "cargaHoraria" },
    { rotulo: "Turno", campo: "turno" },
    { rotulo: "Contato", campo: "contato" },
  ],
  textoSelecionar: "Selecione um curso para ver os detalhes.",
  textoVazio: "Nenhum curso cadastrado no momento.",
};

// cursos, vindos do banco
// GET /vagas-curso
export function VagasCursos() {
  return <PainelVagas config={config} />;
}
