import { PainelVagas } from "./PainelVagas";
import type { ConfigPainel } from "@/lib/painelVagas";

const config: ConfigPainel = {
  caminho: "/vagas-emprego",
  campoTitulo: "cargo",
  destaques: [
    { rotulo: "Empresa", campo: "nomeEmpresa" },
    { rotulo: "Cargo", campo: "cargo" },
  ],
  detalhes: [
    { rotulo: "Requisitos", campo: "requisitos" },
    { rotulo: "Salário", campo: "salario" },
    { rotulo: "Benefícios", campo: "beneficios" },
    { rotulo: "Descrição", campo: "descricao" },
    { rotulo: "Localização", campo: "localizacao" },
    { rotulo: "Contato", campo: "contato" },
    { rotulo: "Área da vaga", campo: "areaEmprego" },
  ],
  textoSelecionar: "Selecione uma vaga para visualizar sua descrição.",
  textoVazio: "Nenhuma vaga de emprego cadastrada no momento.",
  campoArea: "areaEmprego",
};

// vagas de emprego, vindas do banco
// GET /vagas-emprego
export function VagasEmprego() {
  return <PainelVagas config={config} />;
}
