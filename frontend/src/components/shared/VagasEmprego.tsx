import { PainelVagas } from "./PainelVagas";
import type { ConfigPainel } from "@/lib/painelVagas";

const config: ConfigPainel = {
  caminho: "/vagas-emprego",
  campoId: "idEmprego",
  campoTitulo: "cargo",
  campoMarca: "nomeEmpresa",
  meta: [
    { campo: "nomeEmpresa", icone: "empresa" },
    { campo: "localizacao", icone: "local" },
  ],
  campoDestaque: "salario",
  campoArea: "areaEmprego",
  detalhes: [
    { rotulo: "Descrição", campo: "descricao" },
    { rotulo: "Requisitos", campo: "requisitos" },
    { rotulo: "Benefícios", campo: "beneficios" },
    { rotulo: "Contato", campo: "contato" },
  ],
  nomeSingular: "vaga",
  nomePlural: "vagas",
  textoVazio: "Nenhuma vaga de emprego cadastrada no momento.",
};

// vagas de emprego, vindas do banco
// GET /vagas-emprego
export function VagasEmprego() {
  return <PainelVagas config={config} />;
}
